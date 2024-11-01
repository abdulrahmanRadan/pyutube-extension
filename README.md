
# YouTube Video Downloader Extension

![Icon](./pyutube/images/icon128.png)

This is a Chrome extension that allows users to easily download YouTube videos by copying the video URL. Once the URL is copied, a download button will appear on the screen, allowing users to initiate the download process.

## Features

- Easy-to-use interface.
- Automatically detects copied YouTube links.
- Works on multiple operating systems (Windows, macOS, Linux).
- Quick access to download videos with a single click.

## Installation

1. Download or clone this repository.
   ```bash
   git clone https://github.com/abdulrahmanRadan/pyutube-extension.git
   ```
   ## Running the Server   
   1. Navigate to the `pyutube-server` directory.
      ```bash
      cd pyutube-extension/pyutube-server
      ```
   2. Install the dependencies:
      ```bash
      npm install
      ```
   3. Start the server:
      ```bash
       npm start
      ```
   ## Usage

2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" at the top right. 
4. Click on "Load unpacked" and select the folder containing the extension files (`pyutube-extension/pyutube`). 
![image](./images/image1.jpg)




1. Copy the URL of the YouTube video you want to download.
2. A download button will appear on the screen.
3. Click the download button to start downloading the video.



## Requirements

- Chrome browser installed on your machine.
- Python installed (for the backend process).

## Dependencies

This extension uses the following tool for downloading videos:
- [pyutube](https://pypi.org/project/pyutube/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you want to contribute to this project, feel free to submit a pull request or open an issue to discuss any improvements.

## Acknowledgements

- Thanks to the contributors of the [pyutube](https://pypi.org/project/pyutube/) project for their work on the video downloading functionality.

