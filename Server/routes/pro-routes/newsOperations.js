const { multerConfig } = require('../../utility/multerConfig')
const NewsItem = require('../../models/pro-models/newsItem')

const langdetect = require('langdetect');
function slugify(headline) {
    return headline
        .replace(/[^\w\s]/gi, '') // Remove special characters
        .trim() // Remove leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase(); // Convert to lowercase
}


const upload = multerConfig(`../uploads/news-uploads/`)

const newsOperations = (app) => {

    // 1. Create (publish the news)
    app.post('/api/news/publish', upload.single('file'), (req, res) => {
        try {
            const data = JSON.parse(JSON.stringify(req.body));

            // creating slug
            const detectedLanguage = langdetect.detect(data.headline);
            console.log("detectedLanguage", detectedLanguage);
            let slug;
            try {
                if (detectedLanguage[0].lang === 'en') {
                    slug = slugify(data.headline)
                } else {
                    slug = data.headline
                }
            } catch (error) {

            }

            NewsItem.findOne({ slug: slug }).then((news) => {
                if (news) {
                    res.send({ status: 'error', message: 'The headline is already exist, try a different headline...' })
                    return
                } else {
                    const news = new NewsItem({
                        headline: data.headline,
                        slug: slug,
                        desc: data.desc,
                        photoURL: req.file.filename
                    })

                    news.save().then((savedNews) => {
                        if (savedNews) {
                            res.send({ status: 'success', message: 'News published successfully' })
                        }
                        else {
                            console.log('Failed to')
                            res.send({ status: 'error', message: 'Could not publish the news, try again' })
                        }
                    })
                }
            })


        } catch (error) {
            console.log(error)
            res.send({ status: 'error', message: 'Something went wrong...' })
        }

    })

    // 2. Read news

    // A. for all news
    app.post('/api/news/getAllNews', (req, res) => {

        const { filter } = req.body
        NewsItem.find(filter).lean().then((news) => {
            res.send({ status: 'success', data: news })
        }).catch((error) => {
            res.send({ status: 'error', message: 'Something went wrong...' })
        })
    })

    // B. for a single news item
    app.post('/api/news/singleNews', (req, res) => {

        const { slug } = req.body

        NewsItem.findOne({ slug }).lean().then((news) => {
            console.log('news', news)
            res.send({ status: 'success', data: news })
        }).catch((error) => {
            res.send({ status: 'error', message: 'Something went wrong...' })
        })
    })

    // C. for old news
    app.post('/api/news/oldNews', async (req, res) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const olderThanOneWeek = await NewsItem.find({ createdAt: { $lt: oneWeekAgo } });

        if (olderThanOneWeek.length > 0 || olderThanOneWeek.length === 0) {
            res.send({ status: 'success', data: olderThanOneWeek });
        } else {
            res.send({ status: 'error', message: 'No data found' });
        }

    })

    // D. for showing in marquee tag
    app.get('/api/news/indexNews', async (req, res) => {
        const latestDocuments = await NewsItem.find().lean().sort({ createdAt: -1 }).limit(30);
        if (latestDocuments.length > 0 || latestDocuments.length === 0) {
            res.send({ status: 'success', data: latestDocuments });
        } else {
            res.send({ status: 'error', message: 'No data found' });
        }
    })

    // 3. Delete the news
    app.post('/api/news/delete', (req, res) => {
        NewsItem.deleteOne({ _id: req.body.id }, function (err, data) {
            if (err) {
                res.send({ status: 'error', message: 'Could not delete the item' });
            } else {
                res.send({ status: 'deleted' })
            }
        })
    })

    // 4. Update (edit the news)
    app.post('/api/news/edit', upload.single('file'), (req, res) => {
        try {
            const data = JSON.parse(JSON.stringify(req.body));
            const slug = slugify(data.headline)

            NewsItem.findOneAndUpdate({ _id: data.id }, {
                headline: data.headline,
                slug: slug,
                desc: data.desc,
                photoURL: req.file ? req.file.filename : data.previousPhotoURL
            }).then((news) => {
                if (news) {
                    res.send({ status: 'success', message: 'News Edited successfully' })
                    return
                } else {
                    res.send({ status: 'error', message: 'Could not edit the news, try again' })
                }
            })


        } catch (error) {
            console.log(error)
            res.send({ status: 'error', message: 'Something went wrong...' })
        }

    })

    app.get('/api/news/search/:search', async (req, res) => {

        const search = req.params.search


        try {
            const news = await NewsItem.find({ headline: { $regex: new RegExp(search, 'i') } }).lean();

            if (news.length > 0) {
                res.send({ status: 'success', data: news })
            } else {
                res.send({ status: '404', message: 'No news found for headline ' + search })
            }

        } catch (err) {
            res.send({ status: 'error', message: 'Something went wrong...' })
        }
    });

    app.post('/api/news/getDataByDate', async (req, res) => {

        const { start, end } = req.body

        const startDate = new Date(start.split('/').reverse().join('-'));
        const endDate = new Date(end.split('/').reverse().join('-'));

        endDate.setDate(endDate.getDate() + 1);

        NewsItem.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }, function (err, results) {
            if (err) {
                res.send({ status: 'error', message: 'Something went wrong' });
            } else {
                console.log(results)
                res.send({ status: 'success', data: results });
            }
        });

    });


}

module.exports = newsOperations