function req(method, url) {
	return new Promise((res, rej) => {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.send();
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				res(xhr.response);
			} else {
				rej(xhr.status);
			}
		};
		xhr.onerror = () => {
			rej(xhr.status);
		};
	});
}


document.querySelector('button').addEventListener('click', (e) => {
	e.preventDefault();
	let queue = ['https://reqres.in/api/users?per_page=12', 'https://reqres.in/api/users?per_page=5'];
	let successfully = 0;

	for (let i = 0; i < queue.length; i++){
		req('GET', queue[i])
		.then((res) => {
			console.log(JSON.parse(res));
			queue[i] = true;
			successfully++
			if (successfully == queue.length){
				console.log('Both responses are completed successfully');
			}
		})
		.catch((error) => {
			console.log('Something goes wrong: ', error);
			queue[i] = false;
		});
	}
});
