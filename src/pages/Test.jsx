import React, { useState } from 'react';

const Test = () => {
  // Initial list of items
  const initialItems = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
    // Add more items as needed
  ];

  // States
  const [leftItems, setLeftItems] = useState(initialItems);
  const [rightItems, setRightItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Event handler for checkbox change
  const handleCheckboxChange = (item) => {
    const updatedSelectedItems = [...selectedItems];
    const index = updatedSelectedItems.findIndex((selectedItem) => selectedItem.id === item.id);

    if (index === -1) {
      updatedSelectedItems.push(item);
    } else {
      updatedSelectedItems.splice(index, 1);
    }

    setSelectedItems(updatedSelectedItems);
  };

  // Event handler for moving items
  const handleMoveItems = (direction) => {
    const sourceItems = direction === 'left' ? rightItems : leftItems;
    const destinationItems = direction === 'left' ? leftItems : rightItems;

    const updatedSourceItems = sourceItems.filter((item) => !selectedItems.includes(item));
    const updatedDestinationItems = [...destinationItems, ...selectedItems];

    direction === 'left' ? setRightItems(updatedSourceItems) : setLeftItems(updatedSourceItems);
    direction === 'left' ? setLeftItems(updatedDestinationItems) : setRightItems(updatedDestinationItems);

    setSelectedItems([]);
  };

  return (
    <div>
      <div>
        <h2>Left Box</h2>
        {leftItems.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            {item.label}
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => handleMoveItems('right')}>&gt;&gt;</button>
        <button onClick={() => handleMoveItems('left')}>&lt;&lt;</button>
      </div>

      <div>
        <h2>Right Box</h2>
        {rightItems.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
