import { Controls } from "../Controls/Controls"
import { actions } from "../../actions/actions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../services/store"
import { gameActions } from "../../services/gameSlice"
import { isEnoughStats } from "../../utils/isEnoughStats"
import { Calendar } from "../Calendar/Calendar"
import { StatsBar } from "../StatsBar/StatsBar"
import { Craftables } from "../Craftables/Craftables"
import { Line } from "../Line/Line"
import { GameOver } from "../GameOver/GameOver"
import { BoatFix } from "../BoatFix/BoatFix"
import { Housing } from "../Housing/Housing"

export const MainView = () => {
    const boat = useSelector((state: RootState) => state.game.boat)
    const craftables = useSelector((state: RootState) => state.game.craftables)
    const housing = useSelector((state: RootState) => state.game.housing)
    const clothes = useSelector((state: RootState) => state.game.clothes)
    const dispatch = useDispatch()

    

    if(boat >= 100) return <GameOver />

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <StatsBar />
            <div style={{display: 'flex', flexDirection: 'column'}}>16 17 14 12 7 6 5 3 2 1
                <BoatFix />
                <Line />
                <div>
                    <Controls buttons={actions.food} craftables={craftables} />
                </div>
                <Craftables name="fishing" craftable={craftables.fishing}/>
                <Craftables name="hunting" craftable={craftables.hunting}/>
                <Craftables name="farm" craftable={craftables.farm}/>
                <Line />
                <Housing housing={housing.hut} name="hut"/>
                <Housing housing={housing.house} name="house"/>
                <Line />
                {
                    !clothes.set.exists ? 
                    (
                        <button onClick={() => {
                            dispatch(gameActions.craftSet())
                            dispatch(gameActions.passDay({days: clothes.set.build}))
                            dispatch(gameActions.reduceStats({food: clothes.set.build}))
                        }}>Craft a set of clothes</button>
                    )
                    :
                    (
                        clothes.set.usage >= clothes.set.repair.longevity ?
                        (
                            <button
                                onClick={() => {
                                    dispatch(gameActions.resetSet())
                                    dispatch(gameActions.passDay({days: clothes.set.repair.duration}))
                                    dispatch(gameActions.reduceStats({food: clothes.set.repair.duration}))
                                }}
                            >
                                Repair
                            </button>
                        )
                        :
                        (
                            <>Set - Days used: {clothes.set.usage}</>
                        )
                    )
                }
                {
                    clothes.set.exists && !clothes.set.maintenance.done && <button onClick={() => {
                        dispatch(gameActions.maintainSet())
                        dispatch(gameActions.passDay({days: clothes.set.maintenance.duration}))
                    }}>Maintain</button>
                }
                <Calendar />
            </div>
        </div>
    )
}
//OBJECTS!!!!!!!!

function deepClone(obj) {
const check = {}
      for(const key in obj) {
          if(typeof obj[key] === 'object') {
              check[key] = deepClone(obj[key])
          }
          else{
              check[key] = obj[key]
          }
      }
      return check
  }
  const original = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3
      }
    }
  };
  const clone = deepClone(original);
  
  //////////////////////////////////////

  function invertObject(obj) {
    return Object.fromEntries(Object.entries(obj).map(el => el.toReversed()))
  }
  const original = {
    a: 1,
    b: 2,
    c: 3
  };
  console.log(invertObject(original));

  ///////////////////////////////////?

  function findDeepKey(obj, key) {
    if(obj.hasOwnProperty(key)){
        return obj[key]
    }
      else {
          for(const check in obj) {
              console.log(obj)
              if(typeof obj[check] === 'object') {
                  return findDeepKey(obj[check], key)
              }
          }
      }
  }
  const data = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3
      }
    }
  };
  console.log(findDeepKey(data, 'd'));

  ///////////////////////////////////

  function mergeDeep(obj1, obj2) {
    const check = {...obj1}
    for (const key in obj2) {
        if(!check.hasOwnProperty(key)) {
            check[key] = obj2[key]
        }
        else {
            check[key] = mergeDeep(check[key], obj2[key])
        }
    }   
    return check
}

const obj1 = {
  a: 1,
  b: {
    c: 2,
      f:{g: 5, h: 6}
  }
};
const obj2 = {
  b: {
    d: 3
  },
  e: 4,
    f: 7
};
console.log(mergeDeep(obj1, obj2));
// Expected output: {a: 1, b: {c: 2, d: 3}, e: 4}

///////////////////////////////////////////

function groupBy(array, property) {
    const check = {}
    for(obj of array) {
        if(!check.hasOwnProperty(obj[property])) {
            check[obj[property]] = [obj]
        }
        else {
            check[obj[property]].push(obj)  
        }
    }
    return check
}

const people = [
  {name: 'Alice', age: 21},
  {name: 'Bob', age: 21},
  {name: 'Charlie', age: 25}
];
console.log(groupBy(people, 'age'));
// Expected output:
// {
//   21: [{name: 'Alice', age: 21}, {name: 'Bob', age: 21}],
//   25: [{name: 'Charlie', age: 25}]
// }

//DATES!!!!!!!!!!
function getCurrentDateTime() {
    return new Date().toLocaleString('ru-RU')
}

console.log(getCurrentDateTime()); // "2024-07-30 12:34:56"
//////////////////////////////////////////////////////////

function daysBetween(date1, date2) {
    const check = Date.parse(date2) - Date.parse(date1)
    console.log(check / 86400000)
}

console.log(daysBetween('2024-01-01', '2024-01-31')); // 30

/////////////////////////////////////////////////////////

function addDays(date, days) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    return newDate
}

console.log(addDays('2024-07-30', 5)); // "2024-08-04"

///////////////////////////////////////////////////////

function getDayOfWeek(date) {
    return (new Date(date).toLocaleString('en-US', {weekday: 'long'}))
}
console.log(getDayOfWeek('2024-07-28'));

/////////////////////////////////////////////////////////

function scheduleEvent(start, end, day) {
    const result = []
        for(let i = new Date(start); Date.parse(i) <= Date.parse(end); i.setDate(i.getDate() + 1)) {
            if(i.toLocaleString('en-US', {weekday: 'long'}) === day) {
                result.push(i.toLocaleString('ru-RU').substring(0, i.toLocaleString('ru-RU').indexOf(',')))
            }
        }
    return result
}
console.log(scheduleEvent('2024-07-01', '2024-07-31', 'Tuesday'));

//GENERATORS!!!!

function* numberGenerator() {
    yield 1;
      yield 2;
      yield 3;
      yield 4;
      return 5;
  }
  const gen = numberGenerator();
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // 3
  console.log(gen.next().value); // 4
  console.log(gen.next().value); // 5

/////////////////////////////////

function* infiniteCounter() {
    let i = 1
    while (true) {
        yield i++
    }
  }
  const gen1 = infiniteCounter();
  for(const i of gen1){
	if(i > 10) break;
	console.log(i);
}

  ///////////////

  function* rangeGenerator(start, end) {
    let i = start
    while (i <= end) {
        yield i++
    }
  }
  const gen = rangeGenerator(5, 10);
  console.log(gen.next().value); // 5
  console.log(gen.next().value); // 6

  ////////////////////////////////////

  function* calculator() {
    const num1 = yield;
    const operator = yield;
    const num2 = yield;
    switch (operator) {
      case '+': yield num1 + num2;
      case '-': yield num1 - num2;
      case '*': yield num1 * num2;
      case '/': yield num1 / num2;
      // Add more operations as needed
    }
  }
  const calc = calculator();
  calc.next(); // Start the generator
  console.log(calc.next(10).value); // Provide num1
  console.log(calc.next('-').value); // Provide operator
  console.log(calc.next(5).value); // Provide num2 and get result

  //////////////////////////////////////////

  /////////////ARRAYS

function rotateMatrix(matrix) {
    const newMatrix = Array(matrix.length).fill([])
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix.length; j++) {
            newMatrix[i][j] = matrix[j][i]
        }    
    }   
    return newMatrix
}       