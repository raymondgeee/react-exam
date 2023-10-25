import React, { useState, useEffect } from 'react';

function DeletePage() {

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/delete', {
            mode: "no-cors",
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                setStatusMessage("Saved successfully!");
            } else if (res.status === 500) {
                setError("Server error. Please try again later.");
            }
        })
        .catch(() => setError("Failed to delete data."));
    };

    if (error) return <div>Error: {error}</div>;

    return (

        
    )
}

export default DeletePage;