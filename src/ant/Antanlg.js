//import points from "/Users/vaceslav/Desktop/aunt/Antcanvas.js"

const antBest = [];
var phero; 
var MAX_CITIES 
var MAX_DIST 
var MAX_TOUR 
var MAX_ANTS 
var ants
var ALPHA 
var BETA 
var RHO  
var QVAL  
var MAX_TOURS 
var MAX_TIME  
var INIT_PHER 
var E_ACO 
var cities 
var dist 
var best 
var bestIndex 


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
            if(to!=from && dist[from][to]=== 0.0)
            {
                var xd = ( ( cities[from][0] - cities[to][0] ) ) * ( ( cities[from][0] - cities[to][0] ) );
                
                var yd = ( ( cities[from][1] - cities[to][1] ) ) * ( ( cities[from][1] - cities[to][1] ) );
                
                dist[from][to] = Math.sqrt(xd + yd);
                dist[to][from] = dist[from][to];
                
            }
        }
    }

    
    to = 0;

    for( ant = 0; ant < MAX_ANTS; ant++)
    {
        if (to == MAX_CITIES)
            to=0;
        
        ants[ant].curCity = to++;
        
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
    var ant,i,to=0;
    
    for ( ant = 0; ant < MAX_ANTS; ant++ )
    {
        if( ants[ ant ].tourLength < best )
        {
            best = ants[ant].tourLength;
            bestIndex = ant;
        }
        
        ants[ant].nextCity = -1;
        ants[ant].tourLength = 0.0;
        
        for( i=0; i < MAX_CITIES; i++)
        {
            ants[ant].tabu[i] = 0;
            ants[ant].path[i] = -1;
        }
        
        if(to == MAX_CITIES)
            to=0;
            
        ants[ant].curCity = to++;
        
        ants[ant].pathIndex = 1;
        ants[ant].path[0] = ants[ant].curCity;
        
        ants[ant].tabu[ants[ant].curCity] = 1;
    }
}


function antProduct(from , to)
{
   
    return(( Math.pow( phero[from][to], ALPHA) * Math.pow( (1.0/ dist[from][to]), BETA)));
}


function selectNextCity(ant )
{
    var from, to;
    var denom = 0.0;
    
    from = ants[ant].curCity;
    for(to=0; to < MAX_CITIES; to++)
    {
        
        if(ants[ant].tabu[to] == 0)
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
        if ( ants[ant].tabu[to] == 0 )
        {
            p = antProduct(from , to) / denom;
            

            var x = ( (Math.random()  )  );

            if(x < p)
            {
                break;
            }

        }
    }
    while(1);

    return to;
}
    
function simulateAnts( )
{
    var k;
    var moving = 0;

    for(k=0 ; k < MAX_ANTS; k++)
    {

        if ( ants[k].pathIndex < MAX_CITIES )
        {

            
            ants[k].nextCity = selectNextCity(k);
            ants[k].tabu[ants[k].nextCity] = 1;
            ants[k].path[ants[k].pathIndex] = ants[k].nextCity;
            ants[k].pathIndex = ants[k].pathIndex + 1;

            ants[k].tourLength = ants[k].tourLength + 
            dist[ants[k].curCity][ants[k].nextCity];
            
            if (ants[k].pathIndex == MAX_CITIES)
            {
                ants[k].tourLength += dist[ants[k].path[MAX_CITIES -1]][ants[k].path[0]];
            }
            
            ants[k].curCity = ants[k].nextCity;
            moving++;
            
        }
    }
    
    return moving;
}

//Updating trails

function updateTrails()
{
    var from,to,i,ant,flag = 0,k;
    
    //Pheromone Evaporation
    for( from=0; from < MAX_CITIES; from++)
    {
    
        for( to=0 ; to < MAX_CITIES ; to++)
        {
            if(from!=to)
            {
                phero[from][to] *=( 1.0 - RHO );
                
                if(phero[from][to] < 0.0 )
                {
                    phero[from][to] = INIT_PHER;
                }
            }

            
        }
    }
   // draw();

    //Add new pheromone to the trails
    
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

            if(flag == 1)
            {
                phero[from][to] += (QVAL / ants[ant].tourLength) + (QVAL / best ) ; //Elitist updation
                phero[to][from] = phero[from][to];
            }
            else
            {
                phero[from][to] += (QVAL / ants[ant].tourLength) ;
                phero[to][from] = phero[from][to];
            }
        }
    }
    //draw();

    for (from=0; from < MAX_CITIES; from++)
    {
        for( to=0; to < MAX_CITIES; to++)
        {
            phero[from][to] *= RHO;
            //console.log(phero[from][to]);
        }
    }

   // draw()

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

//console.log (MAX_CITIES , MAX_TOUR);

var curCity, nextCity, pathIndex , tourLength;


ants = new Array(MAX_ANTS);

for (let i = 0; i < MAX_ANTS; i++) 
{
    ants[i] = 
    {
        curCity, nextCity, pathIndex,
        tabu : new Array(MAX_CITIES),
        path : new Array(MAX_CITIES),
        tourLength : 0,
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
 
        if ( simulateAnts() == 0)
        {


            updateTrails();
            
            //console.log(phero);
  
            if (curTime != MAX_TIME)
                restartAnts();

        }
    }

    for (let i = 0 ; i < MAX_CITIES ; i++) 
    {
        antBest.push( ants[bestIndex].path[i] )
    }
    
}



    
