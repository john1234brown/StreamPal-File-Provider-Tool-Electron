# StreamPal-File-Provider-Tool-Electron
This is a File Providing Tool which helps to automate the upload process to IPFS network and connect to Streampal's peer 2 peer providing network made in NodeJS and built with Electron.

I Hope you enjoy this neat little tool and hope you enjoy using the streampal p2p service i will be leaving documentations soon on how to use the streampal p2p service with your html website.
# Please follow in order to ensure you are able to run this application properly!
# These are all dependencies that basically cant be packaged into the application if we did there file size would be drastically to big!

# First go to this url to install go lang if you don't already have it on your computer!
# 1. https://go.dev/doc/install

# Second go to this url to install the IPFS Desktop application this will allow you to view your files on the IPFS Network locally and publicly

# 2. https://docs.ipfs.tech/install/ipfs-desktop/

# 3. You will need to download the libs folder from here
https://drive.google.com/file/d/1t-uzTSnEqXAMgxhHSlUvIcIDEJbLuh_0/view?usp=drive_link
and extract it into the root folder like so
![image](https://github.com/john1234brown/StreamPal-File-Provider-Tool-Electron/assets/8825800/677c92c8-58ed-43c8-809a-b8476bbca934)

then go to https://dist.ipfs.tech/kubo/
and update the binary file for your distro and replace the binary file in the lib folder for your distro if your not familiar then look here
https://nodejs.org/api/process.html#processplatform and also here https://nodejs.org/api/os.html#osarch

# 4. Please read the config.README.md to properly configure your config.json file real quick!

# 5. npm run install

# 6. npm run dist

# 7. your packaged executable will be located under the /dist folder!

# Note Linux gets appImage same for mac while Windows gets a installer executable so we recommend doing STEP 4! so you don't have to go to appData or tmp directory to configure Later on!
