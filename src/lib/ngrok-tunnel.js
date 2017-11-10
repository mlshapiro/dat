var ngrok = require('ngrok')

module.exports = runNgrok

function runNgrok (state, bus) {
  if (state.dat) return startNgrok()
  bus.once('dat', startNgrok)

  function startNgrok () {
    var port = 8080;

    // ngrok.once('connect', function (url) {
    //     console.log(`ngrok running at url ${url}`);
    // });

    ngrok.connect({
      proto: 'http',  // http|tcp|tls
      addr: port,     // port or network address
      bind_tls: true, // only allow https connections using the *.ngrok.io wildcard cert
      // auth: 'user:pwd', // http basic authentication for tunnel
      // subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
      // authtoken: '12345', // your authtoken from ngrok.com
      // region: 'us' // one of ngrok regions (us, eu, au, ap), defaults to us,
      // configPath: '~/git/project/ngrok.yml' // custom path for ngrok config file
    }, function (err, url) {
      // this callback is only run when there is not an error.
      // the error field seems to always be ''
      if (err === '' || err === undefined || err === null) {
        state.ngrok = {tunneling: true, url: url}
      }
    });
  }
}
