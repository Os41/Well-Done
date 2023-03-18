import React, { useEffect, useState } from 'react';
import { headers, chatCompletions, systemContentTemplate } from './api';
import JeddahMap from './JeddahMap';
export const business  = (
    name, 
    field, 
    description, 
    levelOfPrices, 
    targetGroup, 
    is24hours, 
    isDineIn, 
) => ({
    name: name,
    field: field,
    description: description,
    levelOfPrices: levelOfPrices,
    targetGroup: targetGroup,
    is24hours: is24hours,
    isDineIn: isDineIn,
});

const ZIP_CODES_LOC = {
    22236: [21.485437, 39.188613],
    22443: [21.400081, 39.295890],
    23218: [21.526521, 39.185243],
    23342: [21.557329, 39.208722],
    23425: [21.587027, 39.131067],
    23451: [21.570874, 39.205471],
    23623: [21.649411, 39.132416],
    23715: [21.697774, 39.102326],
    23734: [21.756746, 39.142100],
    23786: [21.859900, 39.235356],
    23425: [21.587007, 39.131282],
    21146: [21.573586, 39.189770],
    23435: [21.569914, 39.149275],
    22338: [21.473910, 39.238600],
    23233: [21.513277, 39.231232],
    23541: [21.610249, 39.195700],
    22246: [21.489024, 39.225294],
    23526: [21.620295, 39.147821],
    23432: [21.562484, 39.164367],
    23761: [21.758155, 39.198061]
};

const ResPage = ({data}) => {
    const [showPlace, setShowPlace] = useState(0);
    return (
        <>
            <div className='l-side'>
                <p>Analysis Information</p>
                <div className='zipCode'>
                    {data?.map((d, index) => 
                        <span
                            className={`${showPlace === index ? "highlight" : ""}`}
                            onClick={() => setShowPlace(index)}
                        >Place {index+1}</span>
                    )}
                </div>
                <div className='contents'>
                    <div className='block'>
                        <p>Success: {data[showPlace]?.success?.percentage}</p>
                        <div>
                            {data[showPlace]?.success?.reasons?.map((res) => <p>- {res}</p>)}
                        </div>
                    </div>
                    <div className='line-center-h'></div>
                    <div className='block'>
                        <p>Risks: {data[showPlace]?.risk?.percentage}</p>
                        <div>
                            {data[showPlace]?.risk?.risks?.map((res) => <p>- {res}</p>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='line-center'></div>
            <div className='r-side'>
                <p>Suggest locations</p>
                <JeddahMap p1={ZIP_CODES_LOC[data[0]?.zipCode]} p2={ZIP_CODES_LOC[data[1]?.zipCode]}/>
            </div>
        </>
    );
}

const Result =  () => {
    const storedObject = JSON.parse(localStorage.getItem("myObject"));

    const messages = [
        {
            role: "system", 
            content: systemContentTemplate
        },
        {   
            role: "user", 
            content: JSON.stringify(storedObject)
        }
    ];

    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch(`https://experimental.willow.vectara.io/v1/${chatCompletions?.path}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(chatCompletions?.body(messages))
        })
          .then(response => response.json())
          .then(data => {
            let jsonString = JSON.stringify(data?.choices[0]?.message?.content);            
            const cleanedJsonString = jsonString.replace(/\n/g, '').replace(/\s\s+/g, ' ');
            const jsonObject = JSON.parse(cleanedJsonString);
            const om = JSON.parse(jsonObject);

            console.log(om);
            setData(om);
          }).catch(error => console.error(error));
    }, []);

    return (
        <div className='res-page'>
            {data ? <ResPage data={data}/> : (
                <p className='loading-text'>Loading...</p>
            )}
        </div>
    );
};

export default Result;