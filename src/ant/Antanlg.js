//import points from "/Users/vaceslav/Desktop/aunt/Antcanvas.js"

const antBest = []; // итоговый путь 
var phero; // матрица феромонов
var MAX_CITIES;  // число городов
var MAX_DIST; // максимальное расстояние
var MAX_TOUR; // максимальный путь
var MAX_ANTS; // число муравьев
var ants; // муравьи
var ALPHA; // кэф / важность следа
var BETA; // кэф к формуле /  важность видимости
var RHO;  //   Скорость испарения
var QVAL;  //     константа в числителе формулы
var MAX_TOURS; //      матрица феромонов
var MAX_TIME;  // время
var INIT_PHER; // феромон по умолчанию
var E_ACO; // 
var cities; // матрица городов
var dist; // матрица расстояний
var best; //
var bestIndex; // лучший путь


function init( )
{
    
    var from,to,ant;

    
    for(from = 0; from < MAX_CITIES; from++)
    {
       
        cities[from][0] = points[from].x;
        
        cities[from][1] = points[from].y;
        
        


        for(to=0 ; to < MAX_CITIES ; to++)
        {
            dist[from][to] = 0.0;
            phero[from][to] = INIT_PHER;
        }
    }
   
    
    
    for(from = 0; from < MAX_CITIES ; from++)
    {
        for( to = 0; to < MAX_CITIES; to++)
        {
            if(to !== from && dist[from][to] === 0.0)
            {
                var xd = ( ( cities[from][0] - cities[to][0] ) ) * ( ( cities[from][0] - cities[to][0] ) );
                
                var yd = ( ( cities[from][1] - cities[to][1] ) ) * ( ( cities[from][1] - cities[to][1] ) );
                
                dist[from][to] = Math.sqrt(xd + yd);
                dist[to][from] = dist[from][to];
                
            }
        }
    } // данные по умолчанию

    
    to = 0;

    for( ant = 0; ant < MAX_ANTS ; ant++)
    {
        if (to === MAX_CITIES)
            to=0;
        
        ants[ant].curCity = to++;                  // муравьи по городам
        
        for(from = 0; from < MAX_CITIES; from++)
        {
            ants[ant].tabu[from] = 0;
            ants[ant].path[from] = -1;
        }
        
        ants[ant].pathIndex = 1;
        ants[ant].path[0] = ants[ant].curCity;
        ants[ant].nextCity = -1;
        ants[ant].tourLength = 0;
        
        //loading first city into tabu list
        
        ants[ant].tabu[ants[ant].curCity] = 1;
        
    }

}


function restartAnts()
{
    var ant, i, to=0;
    
    for ( ant = 0; ant < MAX_ANTS; ant++ )
    {
        if( ants[ ant ].tourLength < best )
        {
            best = ants[ant].tourLength;
            bestIndex = ant; // сохраняем лучший путь
        }
        
        ants[ant].nextCity = -1; 
        ants[ant].tourLength = 0.0;
        
        for( i=0; i < MAX_CITIES; i++)
        {
            ants[ant].tabu[i] = 0;
            ants[ant].path[i] = -1;
        }
        
        if (to === MAX_CITIES) 
        {
            to = 0;
        }
            
        ants[ant].curCity = to++;
        
        ants[ant].pathIndex = 1;
        ants[ant].path[0] = ants[ant].curCity;
        
        ants[ant].tabu[ants[ant].curCity] = 1;
    }
}


function antProduct(from , to)
{
   
    return( ( Math.pow( phero[from][to], ALPHA)  *   Math.pow( (1.0 / dist[from][to] ), BETA) ) ); // Вероятность перехода из вершины from в вершину to  
}


function selectNextCity( ant ) // поиск след города
{
    var from, to;
    var denom = 0.0;
    
    from = ants[ant].curCity;
    for( to = 0 ; to < MAX_CITIES; to++)
    {
        
        if(ants[ant].tabu[to] === 0) // пути которые не посетили
        {
            denom += antProduct(from , to );
        }
    }

    do
    {
        var p;
        to++;
        if ( to >= MAX_CITIES )
            to=0;
        if ( ants[ant].tabu[to] === 0 )
        {
            p = antProduct(from , to) / denom; // насколько привлекательный
            

            var x = ( (Math.random()  )  );

            if(x < p)
            {
                break; // попали
            }

        }
    }
    while(1);

    return to;
}
    
function simulateAnts( ) // моделирования колонии муравьев
{
    var k;
    var moving = 0;

    for( k=0 ; k < MAX_ANTS; k++)
    {

        if ( ants[k].pathIndex < MAX_CITIES )
        {

            
            ants[k].nextCity = selectNextCity(k);
            ants[k].tabu[ants[k].nextCity] = 1;
            ants[k].path[ants[k].pathIndex] = ants[k].nextCity;
            ants[k].pathIndex = ants[k].pathIndex + 1;

            ants[k].tourLength = ants[k].tourLength + 
            dist[ants[k].curCity][ants[k].nextCity];
            
            if (ants[k].pathIndex === MAX_CITIES)
            {
                ants[k].tourLength += dist[ants[k].path[MAX_CITIES -1]][ants[k].path[0]]; 
            }
            
            ants[k].curCity = ants[k].nextCity;
            moving++;
            
        }
    }
    
    return moving;
}



function updateTrails() // добавляем феромоны
{
    var from, to, i, ant, flag = 0, k; 

        
    for( from=0; from < MAX_CITIES; from++)
    {
    
        for( to=0 ; to < MAX_CITIES ; to++)
        {
            if(from !== to)
            {
                phero[from][to] *=( 1.0 - RHO );
                
                if(phero[from][to] < 0.0 )
                {
                    phero[from][to] = INIT_PHER; //Уровень феромона по формуле
                }
            }

        }
    }
    

    
    for(ant=0; ant < MAX_ANTS; ant++)
    {
        for(i=0; i < MAX_CITIES; i++)
        {
            if( i < MAX_CITIES - 1 )
            {
                from = ants[ant].path[i];
                to = ants[ant].path[i+1];

            }
            else
            {
                from = ants[ant].path[i];
                to = ants[ant].path[0];
            }
            
            for ( k=0; k < MAX_CITIES; k++)
            {
      
                if (from === ants[bestIndex].path[k] && to === ants[bestIndex].path[k+1])
                    flag = 1;
            }

            if (flag === 1)
            {
                phero[from][to] += (QVAL / ants[ant].tourLength) + (QVAL / best ) ;  //Уровень феромона по формуле
                phero[to][from] = phero[from][to];
            }
            else
            {
                phero[from][to] += (QVAL / ants[ant].tourLength) ;
                phero[to][from] = phero[from][to];
            }
        }
    }
  

    for (from=0; from < MAX_CITIES; from++)
    {
        for( to=0; to < MAX_CITIES; to++)
        {
            phero[from][to] *= RHO;
        }
    }


}


 function Bob() 
{
    antBest.length = 0;
     MAX_CITIES = points.length ;
     MAX_DIST = Math.sqrt(550 * 550 + 550 * 500);
     MAX_TOUR = (MAX_CITIES * MAX_DIST);
     MAX_ANTS =  50;

     ALPHA = 1.0;
     BETA = 5.0; 
     RHO  = 0.5; 
     QVAL  = 100;
     MAX_TOURS = 20;
     MAX_TIME  = (MAX_TOURS * MAX_CITIES);
     INIT_PHER =  (1.0 / MAX_CITIES);
     E_ACO = 1.0;


    var curCity, nextCity, pathIndex , tourLength;


    ants = new Array(MAX_ANTS);

    for (let i = 0; i < MAX_ANTS; i++) 
    {
        ants[i] = 
        {
            curCity, nextCity, pathIndex,
            tabu : new Array(MAX_CITIES), // пройденные вершины
            path : new Array(MAX_CITIES),
            tourLength : 0, // путь муравья
        };

    }

     cities = new Array(MAX_CITIES);
     dist = new Array(MAX_CITIES);
     phero = new Array(MAX_CITIES);

    for (let i = 0; i < MAX_CITIES; i++) 
    {
      cities[i] = new Array(2);
      dist[i] = new Array(MAX_CITIES);
      phero[i] = new Array(MAX_CITIES);
  
    }

     best = MAX_TOUR;
     bestIndex = 0;

        var curTime = 0;
    
        init( );

        while( curTime < MAX_TIME)

        {
        
            curTime = curTime + 1;
 
            if ( simulateAnts() === 0 )
            {

                updateTrails();
            
  
                if (curTime !== MAX_TIME) 
                {
                    restartAnts();
                }

        }
    }

    for (let i = 0 ; i < MAX_CITIES ; i++) 
    {
        antBest.push( ants[bestIndex].path[i] )
    }
    
}
