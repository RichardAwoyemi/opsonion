powershell -Command "(new-object net.webclient).DownloadString('https://opsonion-ci-testing.herokuapp.com/ping')"
set RUNNER_ID=Runner-%random%
start cypress run --record --key ci-tests --parallel --browser chrome --ci-build-id %RUNNER_ID%
