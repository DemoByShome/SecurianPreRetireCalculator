import fs from 'fs'
import { logger } from '../utils/common'


const LOG_IDENTIFIER = "FILE_UTILS:: "

//function to capture data from a JSON file with user inputs & send the test data for input
//return type: JSON 
export const parseJsonFile = (datapath:string)=> {
    logger(LOG_IDENTIFIER + "Loading test data from " + datapath)
    let data = fs.readFileSync(datapath, "utf-8");
    logger(LOG_IDENTIFIER + "Test data captured from the file <" + datapath + ">:")
    logger(LOG_IDENTIFIER + "JSON:" + data)
    return JSON.parse(data)
}

export const deleteDirectory = (path: string)=> {
    if(fs.existsSync(path)) {
        fs.rmdirSync(path, {recursive: true})
        logger(LOG_IDENTIFIER + `Directory Deleted: ${path}`)
    }
}