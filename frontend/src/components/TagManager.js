import React, { useState } from 'react';

const TagManager = ({ tags, onUpdateTags }) => {
    const [newTag, setNewTag] = useState('');

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            onUpdateTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = tagToRemove => {
        onUpdateTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <h3>Tags</h3>
            <ul>
                {tags.map(tag => (
                    <li key={tag}>
                        {tag} <button onClick={() => handleRemoveTag(tag)}>Remove</button>
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                value={newTag} 
                onChange={e => setNewTag(e.target.value)} 
                placeholder="Add a tag" 
            />
            <button onClick={handleAddTag}>Add Tag</button>
        </div>
    );
};

export default TagManager;
