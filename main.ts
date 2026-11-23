import F from"node:fs";
const S="(=@-UZns''''''''FFFFFFFAFFFAFFF'FFF'''''''''''''*//*('''''''''''AF''''''''''''''--<-";
function run(p,q){
const n=p.length,D=new Int32Array(256),M=D.slice(),C=new Int32Array(64),O=new Uint8Array(65536);
let s=0,c=0,u=0,j=0,g=0,t=0,i,v,w,a,b,x,y,e,k,P;
try{
for(;;){
if(t++==1e6)throw 10;
if(g<0|g>=n)throw 9;
e=p[g];k=S.charCodeAt(e)-40;
if(e>83|k<0)throw 5;
if(g+k%5>=n)throw 9;
P=k/5%4|0;
if(s<P||s-P+(k/20|0)>256)throw s<P?2:3;
g+=1+k%5;
switch(e){
case 0:throw 0;
case 1:D[s++]=p[g-1]<<24>>24;break;
case 2:D[s++]=p.readInt32LE(g-4);break;
case 3:s--;break;
case 4:case 6:D[s++]=D[s-e/2];break;
case 5:v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;
case 7:v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break;
case 23:case 27:D[s-1]=e<24?-D[s-1]:~D[s-1];break;
case 48:case 49:case 50:g+=e==48||(e==49)==(D[--s]==0)?p.readInt16LE(g-2):0;break;
case 51:if(c==64)throw 7;C[c++]=g;g=p[g-2]|p[g-1]<<8;break;
case 52:if(!c)throw 8;g=C[--c];break;
case 64:case 65:v=D[s-1];if(v<0|v>>8)throw 6;e<65?D[s-1]=M[v]:(M[v]=D[s-2],s-=2);break;
case 80:w=D[--s]+"";if(u+w.length>65536)throw 11;for(i=0;i<w.length;)O[u++]=w.charCodeAt(i++);break;
case 81:if(u==65536)throw 11;O[u++]=D[--s]&255;break;
case 82:D[s++]=q[j++]??-1;break;
case 83:throw D[--s]&255;
default:a=D[s-2];b=D[s-1];x=a>>>0;y=b>>>0;
if(e>18&e<23&!b)throw 4;
D[--s-1]=[a+b,a-b,Math.imul(a,b),a/b,a%b,x/y,x%y,,a&b,a|b,a^b,,a<<b,a>>b,a>>>b,,a==b,a<b][e-16]??(x<y);
}
}
}catch(z){
return[O.slice(0,u),z];
}
}
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:Y="/output"}=process.env,{readdirSync:R,readFileSync:G,writeFileSync:W,mkdirSync:K}=F;
for(const d of R(I)){
const[o,z]=run(G(I+"/"+d+"/program.bin"),G(I+"/"+d+"/input.bin")),h=Y+"/"+d;
K(h,{recursive:true});
W(h+"/stdout.bin",o);
W(h+"/exit.txt",z+"\n");
}
