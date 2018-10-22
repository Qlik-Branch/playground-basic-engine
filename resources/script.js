var config={}
// Change the schema version below as necessary to match your environment
getSchema("12.170.2").then(schema => {
	config.schema = schema
	return Playground.authenticate(config, "ticket")
}).then(function(ticket){
  config.url += `?qlikTicket=${ticket}`
	const session = enigma.create(config)
  session.open().then(global => {
		console.log(global)
		global.openDoc(config.appname).then(app => {
			console.log(app)
		})    
  });
});

function getSchema(version) {
	return new Promise((resolve, reject) => {
	    const xhr = new XMLHttpRequest()
	    xhr.open("GET", `/node_modules/enigma.js/schemas/${version}.json`)
			xhr.setRequestHeader("Access-Control-Allow-Origin","http://localhost:8000");
	    xhr.onload = () => resolve(JSON.parse(xhr.responseText))
	    xhr.onerror = () => reject(xhr.statusText)
	    xhr.send()
	  })
}
