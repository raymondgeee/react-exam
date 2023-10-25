import React, { useState, useEffect } from 'react';
import schema from './json/schema.json'; 
import record from './json/record.json';

function EditPage() {
    const [formData, setFormData] = useState(record);
    const [companies, setCompanies] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('../src/json/companies.json')
            .then(res => res.json())
            .then(data => setCompanies(data.data))
            .catch(err => setError("Failed to load companies."));
    }, []);

    console.log(companies)

    const handleInputChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/save', {
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
        .catch(() => setError("Failed to save data."));
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            {schema.fields.sort((a, b) => a.seq - b.seq).filter(s => s.show_in_listing).map(field => (
                <div key={field.id}>
                    <label key={field.key}>{field.label}</label>
                    
                    {(field.type === "text" || field.type === "tel") && (
                        <input
                            key={field.id}
                            type={field.type}
                            name={field.label}
                            max={field.maxlength}
                            readOnly={field.readonly}
                            value={formData[0][field.key] || ""}
                            required={field.required}
                            onChange={handleInputChange}
                        />
                    )}
                    {field.type === "dropdown" && (
                        
                        <select
                            key={field.id}
                            name={field.label}
                            max={field.maxlength}
                            readOnly={field.readonly}
                            required={field.required}
                            onChange={handleInputChange}
                            >
                            {Object.entries(companies).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    )}

                    {field.type === "textarea" && (
                        
                            <textarea
                                key={field.id}
                                type={field.type}
                                name={field.label}
                                max={field.maxlength}
                                readOnly={field.readonly}
                                value={formData[0][field.key] || ""}
                                required={field.required}
                                onChange={handleInputChange}
                            ></textarea>
                        
                    )}

                    {field.type === "checkbox" && (
                        <div key={field.id}>
                           {Object.entries(field.source).map(([key, value]) => (
                                <div key={field.id}>
                                    
                                    <input
                                        key={field.id}
                                        type={field.type}
                                        name={field.label}
                                        max={field.maxlength}
                                        readOnly={field.readonly}
                                        value={value}
                                        required={field.required}
                                        onChange={handleInputChange}
                                    />
                                {key}
                                </div>
                            ))}
                        </div>
                        
                    )}
                    {field.type === "radio" && (
                        <div key={field.id}>
                           {Object.entries(field.source).map(([key, value]) => (
                                <div key={field.id}>
                                    
                                    <input
                                        key={field.id}
                                        type={field.type}
                                        name={field.label}
                                        max={field.maxlength}
                                        readOnly={field.readonly}
                                        value={value}
                                        required={field.required}
                                        onChange={handleInputChange}
                                    />
                                {key}
                                </div>
                            ))}
                        </div>
                        
                    )}
                </div>
            ))}
            <div>
                <button type="submit">Save</button>
            </div>
            {statusMessage && <div>{statusMessage}</div>}
        </form>
    );
}

export default EditPage;

  