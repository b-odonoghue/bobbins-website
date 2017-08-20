// EVERYTHING HERE IS CURRENTLY CONFIGURED FOR WINDOWS :(
import { createIndexAndStuff } from "./elasticsearch";

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const extract = require('extract-zip');
const slash = path.sep;
const windowsOperatingSystem = slash === '\\' ? true : false;
const destinationDirectory = __dirname + slash;
const elasticsearchLink = "https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.3.zip";
const elasticsearchYmlAddition = 'http.cors.enabled: true \nhttp.cors.allow-origin: "*"';

setupElasticSearch(elasticsearchLink, destinationDirectory);

// Download and unzip elasticsearch if needed, starts server (always), and configures database if needed
async function setupElasticSearch(downloadLink:string, unzipDestination:string) {
    const downloadFileName = downloadLink.substr((downloadLink.lastIndexOf('/') + 1));
    const downloadFileNameWithoutExtension = downloadFileName.substr(0, downloadFileName.lastIndexOf('.'));

    if (fs.existsSync(destinationDirectory + downloadFileNameWithoutExtension)) {
        console.log(`${unzipDestination + downloadFileNameWithoutExtension} already exists.`);
    }
    else {
        await downloadFile(elasticsearchLink, destinationDirectory);
        await unzipFile(destinationDirectory + downloadFileName, destinationDirectory);
        await deleteFile(destinationDirectory + downloadFileName);
    }

    // Modify elasticsearch.yml to allow connections
    const ymlFileLocation = destinationDirectory + downloadFileNameWithoutExtension + slash + 'config' + slash + 'elasticsearch.yml';
    if (fs.readFileSync(ymlFileLocation).indexOf(elasticsearchYmlAddition) >= 0) {
        console.log("elasticsearch.yml is properly configured i guess.");
    }
    else {
        fs.appendFileSync(ymlFileLocation, elasticsearchYmlAddition);
    }

    const batFileLocation = destinationDirectory + downloadFileNameWithoutExtension + slash + 'bin' + slash + 'elasticsearch.bat';
    if (windowsOperatingSystem) {
        childProcess(batFileLocation, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
    }
    else {
        childProcess.exec(`${destinationDirectory + downloadFileNameWithoutExtension}/bin/elasticsearch`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
    }
    setTimeout(createIndexAndStuff,60000); // should find a better way to do this
}

function downloadFile(downloadLink:string, dest:string) {
    return new Promise((resolve, reject) => {
        const fileName = downloadLink.substr(downloadLink.lastIndexOf('/') + 1);
        if (!fs.existsSync(dest + fileName)) {
            const file = fs.createWriteStream(dest + fileName);
            const request = https.get(downloadLink, function(response:any) {
                response.pipe(file).on('finish', () => resolve());
            });
        }
        else {
            console.log(`The downloaded file ${dest + fileName} already exists.`);
            resolve();
        }
    });
}

function unzipFile(source:string, target:string) {
    return new Promise((resolve, reject) => {
        const sourceWithoutExtension = source.substr(0, source.lastIndexOf('.'));
        const unzippedFolderName = sourceWithoutExtension.substr(sourceWithoutExtension.lastIndexOf(slash) + 1);
        try {
            fs.statSync(target + slash + unzippedFolderName);
            console.log(`The unzipped file ${target + slash + unzippedFolderName} already exists.`);
        }
        catch(e) {
            extract(source, {dir: target}, function (err:any) {
                console.log(err);
                resolve();
            });
        }
    });
}

function deleteFile(source:string)
{
    return new Promise((resolve, reject) => {
        if (fs.existsSync(source)) {
            fs.unlink(source, () => resolve());
            console.log(`deleted ${source}`);
        }
    });
}

