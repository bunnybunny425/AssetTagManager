import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TagManager from './TagManager';
import '../App.css';

const AssetList = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        const fetchAssets = async () => {
            const response = await axios.get('http://localhost:5000/api/assets');
            setAssets(response.data);
        };
        fetchAssets();
    }, []);

    const handleTagUpdate = async (id, tags) => {
        await axios.patch(`http://localhost:5000/api/assets/${id}/tags`, { tags });
        setAssets(assets.map(asset => asset.id === id ? { ...asset, tags } : asset));
    };

    return (
        <div className='assets'>
            <h1>Asset List</h1>
            {assets.map(asset => (
                <div className="asset" key={asset.id}>
                    <h2>{asset.name}</h2>
                    <p>Manufacturer: {asset.manufacturer}</p>
                    <TagManager tags={asset.tags} onUpdateTags={tags => handleTagUpdate(asset.id, tags)} />
                </div>
            ))}
        </div>
    );
};

export default AssetList;
