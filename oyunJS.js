
/*
kirmizi #E26464 
mavi #66ADE3 
yesil #86E264 
*/
var hucre = new Array(5);
for(var a=1;a<=5;a++)
    hucre[a] = new Array(6);
    
var rYesil = new Array(5);
    for(var b=1;b<=5;b++)
        rYesil[b] = new Array(6);

var puan = 0;
var d,hak=3,Y=2;
function getRandomInt(min, max) {  //rastgele açılacak kutuları belirler
    return Math.floor(Math.random() * (max - min+1)) + min;
}

function renkDegistir(hucreID1, hucreID2, renk){ // matrise renk ataması yapar
	hucre[hucreID1][hucreID2] = renk;
    document.getElementById(("hucre"+hucreID1+""+hucreID2)).style.background = renk;
    if(renk=="#86E264"){
        randomYesil(hucreID1,hucreID2);
    }
}

function randomYesil(satir,sutun){ //rYesil matrisine yesil kutuları aktarır
    rYesil[satir][sutun]="#86E264";
}
   
function maviAtama(){ //matrisin tamamını mavi yapar
    for(i=1;i<=5;i++){
        for(j=1;j<=6;j++){
            renkDegistir(i,j,"#66ADE3");
        }
    }
}

function skorHesapla(p){ //puanları skor tablosuna yerleştirir
    p1=document.getElementById("p1").innerHTML;
    p2=document.getElementById("p2").innerHTML;
    if(p1<p){
        document.getElementById("p2").innerHTML = document.getElementById("p1").innerHTML;
        document.getElementById("p1").innerHTML = p;
    }else if(p2<p){
        document.getElementById("p2").innerHTML = p;
    } 
}


    
function oyunBaslat(){  // ana fonksiyon oyunu başlatır

    document.getElementById("puan").innerHTML = puan + " Puan";
    d=0;

    setTimeout("maviAtama()",600);
    
    setTimeout(function yesilAtama(){ //matrise rastgele gelen yesil kutuları atar
        var i = 1;
        var r1,r2;
        while(i<=Y){
            r1=getRandomInt(1,5);
            r2=getRandomInt(1,6);
            while(hucre[r1][r2]=="#86E264"){
                r1=getRandomInt(1,5);
                r2=getRandomInt(1,6);
            }
            renkDegistir(r1,r2,"#86E264");
            i++;
        }
    },900);

    setTimeout(function maviAtama(){ 
        for(i=1;i<=5;i++){
            for(j=1;j<=6;j++){
                if(hucre[i][j]!="#E26464")
                   renkDegistir(i,j,"#66ADE3");
            }
        }
    },2400);

}


function tikKontrol(ID1,ID2){
  if(hucre[ID1][ID2] != "#86E264"){
   if(hucre[ID1][ID2] != "#E26464"){

    var i,j;
    if(rYesil[ID1][ID2]=="#86E264"){
        document.getElementById(("hucre"+ID1+""+ID2)).style.background = "#86E264";
        hucre[ID1][ID2] = "#86E264";
        if(++d >= Y){
            puan = puan + 10;
            for(i=1;i<=5;i++)
                for(j=1;j<=6;j++){
                    rYesil[i][j]=" ";//rYesil matrisini temizleme
                    hucre[i][j]="#E26464";
                }     
            if(Y==18){
                alert("Tebrikler! "+puan+" Puan ile Kazandınız :)");
                Y=2;
            }else
                Y++;
            oyunBaslat();   
            }
    }else{
        document.getElementById(("hucre"+ID1+""+ID2)).style.background = "#E26464";
        hucre[ID1][ID2] = "#E26464";
        if(--hak <= 0){
            for(i=1;i<=5;i++)
                for(j=1;j<=6;j++){
                    rYesil[i][j]=" "; //rYesil matrisini temizleme
                    hucre[i][j]="#E26464";
                }
            Y=2;
            skorHesapla(puan);
            document.getElementById("hak").innerHTML = hak;
            alert("Puan :"+puan+" Oyun Bitti ): Tekrar Deneyin");
            puan = 0;
            hak=3;
            oyunBaslat();
        }
        document.getElementById("hak").innerHTML = hak;     
    }
   }
  }
}



