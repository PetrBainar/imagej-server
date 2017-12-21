mkdir "c:\it4i\repos\imagej-server\plugins"
pushd %systemdrive%%homepath%\.m2\
for /r %%a in (*.jar) do (
  COPY "%%a" "c:\it4i\repos\imagej-server\plugins\%%~nxa"
)
popd