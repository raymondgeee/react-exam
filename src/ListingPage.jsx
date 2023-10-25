import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import './App.css';

const ITEMS_PER_PAGE = 10;

const ListingPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [field, setField] = useState([]);
	const [data, setValues] = useState([]);

	useEffect(() => {
		fetch('../src/json/schema.json') 
			.then(response => response.json())
			.then(data => setField(data.fields));

		fetch('../src/json/data.json') 
			.then(response => response.json())
			.then(data => setValues(data));
	}, []);

  
	const fieldsToShow = field
		.filter(s => s.show_in_listing)
		.sort((a, b) => a.seq - b.seq)
		.map(s => s.label);

	const paginatedData = data.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	function handleDelete(id, e){
		e.preventDefault();
		if ( confirm("Are you sure want delete this id " + id)) {
			fetch('http://localhost:3000/delete?id'+id, {
				method: 'GET',
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
		}
	}

	return (
		<div>
			<table border="1">
				<thead>
					<tr>
					{fieldsToShow.map(field => (
						<th key={field}>{field}</th>
					))}
					<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{paginatedData.map(item => (
					<tr key={item.id}>
						<td>{item.fullname}</td>
						<td>{item.company}</td>
						<td>
						{	
							item.roles.map(ro => (
								<div key={ro}>{ ro }</div>
							))
						}
						</td>
						<td>{item.gender}</td>
						<td>{item.mobile}</td>
						<td style={{textAlign:'center'}}>
							<Link to={`/edit/${item.id}`} 
								state={{
								fullname: item.fullname,
								company: item.company,
								roles: item.roles,
								gender: item.gender,
								mobile: item.mobile,
								}}
							>
								<button>Update</button>
							</Link>
							<button onClick={(e) => handleDelete(item.id, e)}>Remove</button>
						</td>
					</tr>
					))}
				</tbody>
			</table>
			<br></br>
			<div className='pagination'>
				<button
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					Previous
				</button>
				<span>Page {currentPage}</span>
				<button
					disabled={data.length <= currentPage * ITEMS_PER_PAGE}
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ListingPage;
