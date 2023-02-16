// Handle Avatar change
function handleAvatarChange(e, setAvatar, setFile) {
    setAvatar(null)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setAvatar(reader.result)
        setFile(e.target.files[0])
    }
}

export default handleAvatarChange