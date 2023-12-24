import './App.css';
import { wineData } from './data';
import TableCell from './components/tableCell';
import { useState } from 'react';


function App() {
  let data = JSON.parse(JSON.stringify(wineData));

  const [flavanoidData, setFlavanoidData] = useState({
    mean: [],
    median: [],
    mode: []
  });

  const [gammaData, setGammaData] = useState({
    mean: [],
    median: [],
    mode: []
  });


  const calculateMean = (data, property) => {                 //function to calculate Mean
    let meanVals = [];
    for (const key in data) {
      let vals = data[key];
      const sum = data[key].reduce((acc, curr) => acc + Number(curr[property]), 0);
      const result = sum / data[key].length;
      meanVals.push(result.toFixed(3));
    }
    return meanVals;
  }

  const calculateMedian = (data, property) => {                   //function to calculate Median
    let medianVals = [];
    for (const key in data) {
      const sortedData = data[key].sort((a, b) => {
        return (Number(a[property]) - Number(b[property]))
      });
      const middle = Math.ceil(sortedData.length / 2);
      if (sortedData.length % 2 === 0) {
        let val = (sortedData[middle][property] + sortedData[middle + 1][property]) / 2;
        medianVals.push(val);
      } else {
        medianVals.push(sortedData[middle][property]);
      }
    }
    return medianVals;
  }

  const calculateMode = (data, property) => {     //function to calculate mode
    let modeVals = [];
    for (const key in data) {
      let classData = data[key];
      console.log(classData);

      const frequencyMap = {};

      classData.forEach((item) => {
        const value = item[property];
        if (value !== undefined) {
          frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        }
      });

      let modes = [];
      let maxFrequency = 0;

      for (const value in frequencyMap) {
        const frequency = frequencyMap[value];

        if (frequency > maxFrequency) {
          modes = [value];
          maxFrequency = frequency;
        } else if (frequency === maxFrequency) {
          modes.push(value);
        }
      }

       modeVals.push(modes);
    }
    return modeVals;
  }

  const groupBy = (arr, key) => {          //function to group data classwise 'Class': Alcohol
    return arr.reduce((acc, obj) => {
      const keyValue = obj[key];

      if (!acc[keyValue]) {
        acc[keyValue] = [];
      }

      acc[keyValue].push(obj);

      return acc;
    }, {});
  }

  const getFlavonoidsData = () => {
    let classWiseData = groupBy(data, 'Alcohol');
    let meanResult = calculateMean(classWiseData, 'Flavanoids');
    let medianResult = calculateMedian(classWiseData, 'Flavanoids');
    let modeResult = calculateMode(classWiseData, 'Flavanoids');
    setFlavanoidData({
      mean: meanResult,
      median: medianResult,
      mode: modeResult
    })
    console.log(classWiseData);
  }

  const getGammaData = () => {
    let newData = { ...data };
    for (const item in newData) {
      let gamaVal = ((newData[Number(item)]['Ash']) * (newData[Number(item)]['Hue'])) / newData[Number(item)]['Magnesium'];
      newData[Number(item)]['Gamma'] = Number(gamaVal.toFixed(3));
    }
    let classWiseData = groupBy(data, 'Alcohol');
    let meanResult = calculateMean(classWiseData, 'Gamma');
    let medianResult = calculateMedian(classWiseData, 'Gamma');
    let modeResult = calculateMode(classWiseData, 'Gamma');
    setGammaData({
      mean: meanResult,
      median: medianResult,
      mode: modeResult
    })
  }

  return (
    <>
      <div className="App">
        <button onClick={getFlavonoidsData}>Get Class-wise Flavanoids Mean, Median & Mode </button>
        <button onClick={getGammaData}>Get Class-wise Gamma Mean, Median & Mode</button>
      </div>
      <div className='App'>
        {flavanoidData.mean.length > 0 && <TableCell data={flavanoidData} type={'Flavanoids'} />}
        {gammaData.mean.length > 0 && <TableCell data={gammaData} type={'Gamma'} />}
      </div>
    </>
  );
}

export default App;
