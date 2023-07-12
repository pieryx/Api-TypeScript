type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>
    | null;

export interface JSONObject {
        [x: string]: JSONValue;
    }
    
export interface JSONArray extends Array<JSONValue> { }
