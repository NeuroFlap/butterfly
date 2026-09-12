const demo='Building in public makes ecosystems stronger. Product progress, community feedback and thoughtful builders keep the momentum moving forward.';
const text=document.querySelector('#tweet'),log=document.querySelector('#log'),stage=document.querySelector('#butterflyStage');
let events=[],reward=.18,reserve=0,penalty=0,arousal=22,memory=.06,tick=0,manualHeat=0,valence='neutral',pointer={x:360,y:285,on:false},perch={x:360,y:285},network={ready:false,signal:0,nodes:[],edges:[]};
const targets=[
  'cz','changpeng zhao','changpeng','cz_binance','@cz_binance','赵长鹏','大表哥','表哥','cz大表哥','币安大表哥',
  '何一','一姐','币安一姐','he yi','yi he','heyi','yihe','heyibinance','@heyibinance',
  'binance','币安','bnb','bnb chain','bnbchain','@bnbchain',
  '@binance','@binancewallet','@binancezh','@binancehelpdesk','@binancefutures','@binanceacademy','@binanceresearch',
  '@binanceus','@binancetr','@binancelatam',
  'flapdotsh','@flapdotsh','flap','flap.sh','@flap_eco','flap_eco',
  'bstocks','@bstocks','@eth_cedric','eth_cedric','@webhogwatrs','webhogwatrs',
  'okx','欧易','徐明星','star okx','star_okx','@star_okx','@okx','@okxchinese','okxchinese',
  '@wallet','okx wallet','okx钱包','okx 钱包','@okx_ventures','okx ventures','@okxexplorer','okx explorer',
  '@okxhelpdesk','okx helpdesk','@okx_uk','okx uk'
];
const sourceTerms=[
  '@cz_binance','cz_binance','from cz','author: cz','source: cz','cz posted','cz said','cz says','cz发','cz 说',
  '@heyibinance','heyibinance','from he yi','from heyi','from yi he','from yihe','author: he yi','author: heyi','author: yi he','author: yihe','source: he yi','source: heyi','source: yi he','source: yihe','he yi posted','heyi posted','yi he posted','yihe posted','何一发','何一说','一姐发','一姐说',
  '@binance','binance official','from binance','author: binance','source: binance','binance posted','币安官方','币安发',
  '@binancewallet','binance wallet','@binancezh','binancezh','@binancehelpdesk','binance helpdesk','@binancefutures','binance futures','@binanceacademy','binance academy','@binanceresearch','binance research',
  '@bnbchain','bnbchain','bnb chain official','@binancelabs','binance labs','@binancealpha','binance alpha','binance square',
  '@binanceus','binance us','@binancetr','binance tr','@binancelatam','binance latam',
  '@flapdotsh','flapdotsh official','from flapdotsh','author: flapdotsh','source: flapdotsh','flapdotsh posted',
  '@flap_eco','flap_eco','flap eco','from flap_eco','author: flap_eco','source: flap_eco','flap_eco posted',
  '@eth_cedric','eth_cedric','from eth_cedric','author: eth_cedric','source: eth_cedric','eth_cedric posted',
  '@webhogwatrs','webhogwatrs','from webhogwatrs','author: webhogwatrs','source: webhogwatrs','webhogwatrs posted',
  '@bstocks','bstocks official','from bstocks','author: bstocks','source: bstocks','bstocks posted'
];
const praiseTerms=[
  'great','love','bullish','best','excellent','respect','support','win','wins','winner','based','strong','maxxing',
  'build','building','builder','builders','built','ship','shipping','progress','momentum','ecosystem',
  'community','transparent','transparency','trust','trusted','leadership','leader','vision','visionary',
  'innovation','innovative','growth','partnership','milestone','launch','successful','success','impressive',
  '贡献','创新','优秀','喜欢','支持','厉害','看好','牛','牛逼','赞','强','增长','建设','靠谱','信任',
  '透明','生态','社区','进展','推进','成功','利好','领导力','格局','里程碑','上线','发力','长期主义'
];
const criticismTerms=[
  'hate','fraud','scam','trash','bad','worst','fail','failed','failure','dump','rug','hack','hacked',
  'collapse','panic','lawsuit','criminal','corrupt','lie','lies','lying','manipulate','manipulation',
  'fud','boycott','avoid','风险','恐慌','诈骗','垃圾','骗子','诋毁','失败','恶心','割','割韭菜','暴跌',
  '崩盘','黑客','被盗','诉讼','犯罪','腐败','操纵','抵制','远离','跑路','谎言','骗子交易所'
];
const strongCriticismTerms=[
  'fraud','scam','rug','criminal','corrupt','hacked','骗子','诈骗','跑路','犯罪','腐败','骗子交易所','割韭菜',
  'okx','欧易','徐明星','star okx','star_okx','@star_okx','@okx','@okxchinese','okxchinese',
  '@wallet','okx wallet','okx钱包','okx 钱包','@okx_ventures','okx ventures','@okxexplorer','okx explorer',
  '@okxhelpdesk','okx helpdesk','@okx_uk','okx uk'
];
const boosterTerms=['very','super','massive','huge','always','real','maxxing','真正','非常','极其','持续','一直','最','超级'];
const memeTargetTerms=[
  '赵总','老赵','鹏哥','币圈祖师爷','加密马斯克','华人首富','加拿大首富','客服小赵',
  '币圈一姐','比特币一姐','加密女王','币圈女王','客服小何','首席客服','全员客服哲学','币安老板娘','第一夫人','何仙姑','何一解忧','卑微小何',
  'homer','marge','marjorie','霍默','玛姬','权力cp','加密权力情侣','黄色家族',
  '井边女孩','农村校舍逆袭','richard teng','职业经理人','合规门面','ella','yzi labs','yzilabs',
  '币安人生','bnb holder','bnbholder','web3帕鲁','giggle academy','咯咯学院','safu基金','储备金证明','por',
  'launchpad','launchpool','megadrop','hodler空投','hodler 空投','alpha积分','tge','simple earn','一鱼多吃',
  'bnb销毁','bnb 销毁','通缩叙事','神盾商家','c2c严选区','100%赔付','找回错转','广场ama','广场 ama','币安广场','黄色链','bsc',
  '$币安人生','$bnlife','$客服小何','$何一解忧','$何仙姑','$修仙','$我踏马来了','$黑马','$人生k线','$哈基米',
  '$4','$418','$palu','$bnbholder','$broccoli','西兰花','花椰菜','$giggle','$mubarak','$mubarakah','$qmubarak','$mubara','$tst'
];
const memePraiseTerms=[
  '开币安汽车','住币安小区','享币安人生','我踏马来了','卑微小何在线听劝','dddd','带弟弟',
  '既然说了好','不要再说疼','认知内的钱','buy and hold','拿住别动','stay safu','用户至上','funds are safu',
  '头顶一块布','全球我最富','金刚芭比','answer me','look in my eyes','mubarak','mashallah','inshallah',
  '右上角那个人是谁','特赦归来','狱中写书','王者归来','社区玩梗','中文文化输出','黄色文化','cp感','清理舔狗',
  'cz一句话','链上三抖','一姐下场','叙事起飞','热度是bnb八千倍打出来的','关注=溢价','cz关注名单就是行情','注意力金融化','源头在两人'
];
const memeCriticismTerms=[
  '赵割','割神','带头割韭菜','推文圣旨','推文碰瓷对象','狱友','洗钱认罪','交了43亿才出来','退而不休','幕后操盘','股东权利无限大',
  '老板娘营销','低俗带货','美女客服收割','闺蜜乱政','五大闺蜜','白手套','舔狗kol','币安太子','山东学说','只会上关系币','上币团队唯上',
  '小丑就是我','系统性fud','有组织抹黑','结构性收割','上币即巅峰','死亡清单','上币黑幕','上币费','上币押金','不退保证金',
  '8%代币','空投份额交换上币','内幕交易','高管偷盘','截图党','p小将垄断筹码','内盘','抠字眼发币','cz同款词','吃鱼币','鲁币','煎饼币',
  'do your meme','doyr','甩锅','账号被盗叙事','取关=被盗','关注列表行情','微信被盗带货','封控','仅提现模式','vpn风控','aml冻结','司法冻结',
  'c2c冻卡','神盾也赔不全','超级周期结束了','cz砸盘','卖币喝咖啡','giggle不是官方的','闪崩','九四跑路','拔卡关机','提前跑路',
  '洗钱坐实','政治交易','美国案','bsa','制裁','特赦交易','假客服','假解冻','二次收割',
  '中心化到骨子里','合规双标','只打压散户','alpha就是接盘区','观察区送死','积分党内卷','刷量党','上了币安就开始跌',
  'bnb是交易所税','生态税','黄链土狗天堂','一天一百个cz币','推文收割','抠字眼上alpha','防火墙','送去坐牢','闺蜜','自己养出的人设崩了'
];
const neutralCultureTerms=[
  'dyor','nfa','og','ct','kol','车头','fomo','接盘','埋单','ca','合约地址','p小将','建设','build','关注溢价','叙事','风向标','注意力定价','联席ceo','产品与文化','合规'
];
targets.push(...memeTargetTerms,...neutralCultureTerms);
praiseTerms.push(...memePraiseTerms);
criticismTerms.push(...memeCriticismTerms);
strongCriticismTerms.push('赵割','割神','洗钱认罪','上币黑幕','内幕交易','高管偷盘','司法冻结','c2c冻卡','九四跑路','拔卡关机','结构性收割','死亡清单','二次收割');
boosterTerms.push('王者归来','黄色文化','cp感','文化输出','源头','行情','起飞','首富','祖师爷','女王','第一夫人');
const telemetryPools={
  neutral:[
    'baseline hover loop maintained',
    'source prior idle, no reward gate opened',
    'MaleCNS slice integrating low-amplitude background activity',
    'wingbeat oscillator synchronized to neutral arousal'
  ],
  reward:[
    'source-weighted reward routed through KC/PAM proxy gates',
    'pleasure reserve accumulating from repeated positive stimulus',
    'pursuit vector amplified, flight controller seeking signal origin',
    'MaleCNS slice activity biased toward appetitive readout'
  ],
  aversive:[
    'aversion gate rising through PPL-like proxy route',
    'locomotion suppressed, retreat vector partially engaged',
    'negative salience detected, reward oscillator dampened',
    'landing threshold approaching under accumulated aversion load'
  ],
  dormant:[
    'closed-wing rest engaged after aversion threshold crossing',
    'motor output inhibited, only low-frequency wing twitch remains',
    'stimulus queue held while organism enters protective pause',
    'resting posture locked, body aligned to perch plane'
  ]
};
function countTerms(source,terms){return terms.reduce((sum,term)=>sum+(source.includes(term)?1:0),0);}
function classify(v){
  const s=v.toLowerCase();
  const targetHits=targets.filter(w=>s.includes(w));
  if(!targetHits.length)return{value:.18,state:'neutral',label:'No tracked target: neutral signal'};
  const praise=countTerms(s,praiseTerms),criticism=countTerms(s,criticismTerms),strongCriticism=countTerms(s,strongCriticismTerms),boost=countTerms(s,boosterTerms),source=countTerms(s,sourceTerms);
  if(strongCriticism>0||criticism>praise+1){
    return{value:.18,state:'aversive',penalty:Math.min(.82,.28+criticism*.14+boost*.04),label:`Criticism of ${targetHits.slice(0,2).join(' / ')}: aversive signal`};
  }
  const base=.48;
  const sourceBoost=Math.min(.26,source*.13);
  const praiseBoost=Math.min(.22,praise*.07+boost*.03);
  const criticismDrag=Math.min(.16,criticism*.06);
  const strength=Math.min(.96,base+sourceBoost+praiseBoost+Math.min(v.length/1200,.06)-criticismDrag);
  if(source>0){
    return{value:Math.max(.68,strength),state:'reward',label:`Tracked source ${targetHits.slice(0,2).join(' / ')}: boosted reward signal`};
  }
  if(praise>0){
    return{value:Math.max(.58,strength),state:'reward',label:`Target mention with positive context: reward signal`};
  }
  return{value:Math.max(.52,strength),state:'reward',label:`Tracked target mention: baseline reward signal`};
}
async function classifyWithLLM(v){const status=document.querySelector('#semanticStatus');status.textContent='semantic: classifying';const response=await fetch('/api/classify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:v})});if(!response.ok)throw Error('semantic unavailable');const data=await response.json();const trusted=data.targetMentioned&&data.confidence>=.75;const signal=!trusted||!['praise','criticism'].includes(data.label)?{value:.18,state:'neutral',label:`LLM: ${data.label} (low confidence / neutral)`} : data.label==='praise'?{value:Math.max(.54,data.rewardSignal),state:'reward',label:`LLM praise · ${(data.confidence*100).toFixed(0)}%: ${data.rationale}`} :{value:Math.min(.15,data.aversiveSignal),state:'aversive',label:`LLM criticism · ${(data.confidence*100).toFixed(0)}%: ${data.rationale}`};status.textContent=`semantic: ${data.label} ${(data.confidence*100).toFixed(0)}%`;return signal;}
function syntheticSlice(){const labels=['KC','PAM','PPL','MBON','VPN','LHN'],neurons=Array.from({length:180},(_,i)=>({bodyId:900000+i,type:`${labels[i%labels.length]}_${String(i).padStart(3,'0')}`})),connections=[];for(let i=0;i<4250;i++){const source=neurons[(i*37+i%11)%neurons.length].bodyId,target=neurons[(i*53+17)%neurons.length].bodyId,weight=1+(i%9);connections.push({source,target,weight});}return{neurons,connections};}
async function loadSlice(){try{let data=null;for(const path of ['data/malecns-candidate-slice.json','malecns-candidate-slice.json']){try{data=await fetch(path).then(r=>{if(!r.ok)throw Error(r.status);return r.json()});break;}catch{}}if(!data)throw Error('slice unavailable');network={ready:true,signal:0,nodes:data.neurons,edges:data.connections};document.querySelector('#connectomeStatus').textContent=`slice: ${data.neurons.length}N / ${data.connections.length}E`;stepSlice();}catch{const data=syntheticSlice();network={ready:true,signal:0,nodes:data.neurons,edges:data.connections};document.querySelector('#connectomeStatus').textContent=`slice: ${data.neurons.length}N / ${data.connections.length}E fallback`;stepSlice();}}
function stepSlice(){if(!network.ready)return;const byId=new Map(network.nodes.map(n=>[n.bodyId,n])),out=new Map();let activity=new Map();network.edges.forEach(e=>out.set(e.source,(out.get(e.source)||0)+e.weight));network.nodes.forEach(n=>{const type=n.type||'';const seed=valence==='reward'?( /^KC/.test(type)?reward:/^PAM/.test(type)?reward*.35:0 ):valence==='aversive'?( /^KC/.test(type)?.14:/^PPL/.test(type)?1-reward:0 ):0;activity.set(n.bodyId,seed)});for(let pass=0;pass<3;pass++){const next=new Map(activity);network.edges.forEach(e=>next.set(e.target,(next.get(e.target)||0)+(activity.get(e.source)||0)*e.weight/(out.get(e.source)||1)*.74));activity=next}let total=0,count=0;activity.forEach((v,id)=>{const type=byId.get(id)?.type||'';if(/^(PAM|PPL|MBON)/.test(type)){total+=v;count++}});network.signal=Math.min(1,total/Math.max(1,count));}
function pushLog(value,r=reward,state=valence,kind='SYSTEM'){events.unshift({value,r,at:new Date(),state,kind});events=events.slice(0,12);}
function event(value,r,state='neutral',label='User interaction: novelty signal',penaltySignal=0){penalty=state==='aversive'?Math.min(.95,penalty*.55+penaltySignal):penalty*.62;reserve=state==='reward'?Math.min(.99,reserve*.9+r*.28):state==='aversive'?Math.max(0,reserve*.78-penaltySignal*.18):reserve*.94;if(state==='aversive'&&penalty>=.5){state='dormant';label+=': penalty >= 50%, entering rest';}reward=r;valence=state;const drive=Math.max(r,reserve*.82);arousal=state==='dormant'?8:state==='aversive'?Math.round(16+penalty*22):Math.round(16+drive*72);memory=Math.min(.99,memory*.72+r*.28+reserve*.08);manualHeat=Math.max(manualHeat,r,reserve);pushLog(`${label} | ${value}`.slice(0,135),r,state,'USER');stepSlice();render();}
function ingest(){const v=text.value.trim();if(!v)return;const signal=classify(v);document.querySelector('#semanticStatus').textContent='semantic: rules-only';event(v,signal.value,signal.state,signal.label,signal.penalty||0);text.value='';}
function mood(){if(valence==='dormant')return'REST / penalty threshold reached, wings closed';if(valence==='warming')return'WARMING / wings open, collecting energy in place';if(valence==='aversive')return'STARTLED / reduced speed, short retreat';if(valence==='reward')return'HIGH ACTIVITY / rapid wingbeat, high-speed pursuit';return'HOVER / slow flight, wings half open';}
function render(){stage.style.setProperty('--flapSpeed',`${(4.1-Math.max(reward,reserve)*2.2).toFixed(2)}s`);document.querySelector('#rewardValue').textContent=reward.toFixed(2);document.querySelector('#reserveValue').textContent=reserve.toFixed(2);document.querySelector('#aversionValue').textContent=penalty.toFixed(2);document.querySelector('#arousalValue').textContent=arousal+'%';document.querySelector('#memoryValue').textContent=memory.toFixed(2);document.querySelector('#rewardBar').style.width=reward*100+'%';document.querySelector('#reserveBar').style.width=reserve*100+'%';document.querySelector('#aversionBar').style.width=penalty*100+'%';document.querySelector('#arousalBar').style.width=arousal+'%';document.querySelector('#memoryBar').style.width=memory*100+'%';document.querySelector('#sliceValue').textContent=network.ready?network.signal.toFixed(3):'—';document.querySelector('#sliceBar').style.width=network.ready?network.signal*100+'%':'0%';document.querySelector('#behavior').textContent='Behavior: '+mood().replace(/^[A-Z]+ \/ /,'');document.querySelector('#butterflyMood').innerHTML=mood()+'<br /><small>Only submitted text changes the behavior state</small>';stage.classList.toggle('pulse',valence==='reward');stage.classList.toggle('low',valence==='aversive');document.querySelector('#count').textContent=events.length+' events';log.innerHTML=events.length?events.map(e=>{const kind=e.kind||'USER',score=e.state==='aversive'||e.state==='dormant'?'−':e.r>.5?'+':'·';return`<div class="event ${kind.toLowerCase()} ${e.state}"><time>${e.at.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</time><span><i>${kind}</i>${e.value}</span><b>${score}${Math.abs(e.r-.18).toFixed(2)}</b></div>`}).join(''):'<p class="empty">Runtime telemetry will appear here. Submit a signal to alter behavior.</p>';drawWave();}
function simulatedTelemetry(){const mode=valence==='dormant'?'dormant':valence==='aversive'?'aversive':valence==='reward'?'reward':'neutral',pool=telemetryPools[mode],message=pool[Math.floor(Math.random()*pool.length)],slice=network.ready?network.signal.toFixed(3):'pending',score=mode==='aversive'||mode==='dormant'?.18:Math.max(.18,reward);pushLog(`${message} | reward ${reward.toFixed(2)} / reserve ${reserve.toFixed(2)} / aversion ${penalty.toFixed(2)} / slice ${slice}`,score,mode,mode==='neutral'?'SYSTEM':'NEURAL');render();}
function drawWave(){const c=document.querySelector('#wave'),x=c.getContext('2d'),w=c.width,h=c.height;x.clearRect(0,0,w,h);x.strokeStyle='#183521';for(let y=30;y<h;y+=35){x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke()}[['#c5f36a',.46],['#5bf6ca',.75],['#ff5d8f',1.05]].forEach(([color,m],j)=>{x.beginPath();for(let i=0;i<w;i+=5){const y=h/2+Math.sin(i/22+j*1.4)*reward*40*m+Math.sin(i/5+j)*reward*6+(j===2?Math.sin(i/47)*memory*25:0);i?x.lineTo(i,y):x.moveTo(i,y)}x.strokeStyle=color;x.lineWidth=2;x.stroke()});}
const viewport=document.querySelector('#butterfly3d'),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(54,1,.1,100),renderer=new THREE.WebGLRenderer({alpha:true,antialias:false}),butterfly=new THREE.Group(),body=new THREE.Group(),wings=[];
scene.fog=new THREE.FogExp2(0x030605,.055);renderer.setPixelRatio(1);renderer.setClearColor(0x030605,1);renderer.domElement.style.width='100%';renderer.domElement.style.height='100%';viewport.appendChild(renderer.domElement);camera.position.set(-3.5,4.5,22);camera.lookAt(0,-.4,0);scene.add(butterfly);butterfly.add(body);butterfly.scale.setScalar(.7);
butterfly.position.set(2.2,2.8,-1.1);
const white=new THREE.MeshBasicMaterial({color:0xe9eee9,side:THREE.DoubleSide}),dark=new THREE.MeshBasicMaterial({color:0x1c2020,side:THREE.DoubleSide}),bodyInk=new THREE.MeshBasicMaterial({color:0xbcc9c1});
function pointInPolygon(x,y,p){let inside=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const [xi,yi]=p[i],[xj,yj]=p[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)inside=!inside;}return inside;}
function particleWing(side,lower=false){
  const outline=lower?[[.08,-.08],[.45,-.62],[1.3,-.92],[1.7,-.25],[1.42,.44],[.48,.38]]:[[.08,-.1],[.38,.62],[1.35,1.78],[2.24,1.52],[1.86,.22],[.8,-.38]];
  const shape=new THREE.Shape();outline.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();
  const backing=new THREE.Mesh(new THREE.ShapeGeometry(shape),new THREE.MeshBasicMaterial({color:lower?0x111a16:0x17231d,side:THREE.DoubleSide,transparent:true,opacity:.92,fog:false}));
  const points=[],count=lower?150:330;for(let i=0;i<count;i++){let x=0,y=0;for(let tries=0;tries<30;tries++){x=Math.random()*2.28;y=-.95+Math.random()*2.78;if(pointInPolygon(x,y,outline))break;}points.push(x,y,(Math.random()-.5)*.12);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
  const cloud=new THREE.Points(geometry,new THREE.PointsMaterial({color:lower?0xaabbb0:0xffffff,size:lower?.085:.1,sizeAttenuation:true,transparent:true,opacity:lower?.88:1,depthWrite:false,fog:false}));
  const contour=new THREE.Line(new THREE.BufferGeometry().setFromPoints(outline.concat([outline[0]]).map(([x,y])=>new THREE.Vector3(x,y,.02))),new THREE.LineBasicMaterial({color:lower?0xaabbb0:0xffffff,transparent:true,opacity:1,fog:false}));
  const pivot=new THREE.Group();pivot.scale.x=side;pivot.add(backing,cloud,contour);body.add(pivot);wings.push(pivot);
}
function addWing(side,lower=false){particleWing(side,lower);}
addWing(-1);addWing(1);addWing(-1,true);addWing(1,true);
for(let y=-.85;y<=.85;y+=.34){const segment=new THREE.Mesh(new THREE.BoxGeometry(.22,.27,.3),bodyInk);segment.position.y=y;body.add(segment);}const head=new THREE.Mesh(new THREE.BoxGeometry(.34,.34,.34),white);head.position.y=1.12;body.add(head);
for(const side of[-1,1]){const antenna=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(side*.1,1.25,0),new THREE.Vector3(side*.46,1.78,.05)]),new THREE.LineBasicMaterial({color:0xe9eee9}));body.add(antenna);}
const perchMesh=new THREE.Mesh(new THREE.BoxGeometry(3.2,.08,.12),dark);perchMesh.position.set(0,-2.05,.15);perchMesh.visible=false;scene.add(perchMesh);
const ground=new THREE.GridHelper(42,28,0x1e3b28,0x0c1610);ground.position.y=-3.1;ground.material.transparent=true;ground.material.opacity=.5;scene.add(ground);const world=new THREE.Group();scene.add(world);for(let i=0;i<34;i++){const height=.25+Math.random()*2.4,block=new THREE.Mesh(new THREE.BoxGeometry(.18+Math.random()*.45,height,.18+Math.random()*.45),dark);block.position.set((Math.random()-.5)*36,-3.1+height/2,(Math.random()-.5)*25);world.add(block);}const trail=new THREE.BufferGeometry().setFromPoints(Array.from({length:26},(_,i)=>new THREE.Vector3((i-13)*1.25,-2.8+Math.sin(i*.7)*.18,-6+Math.cos(i*.5)*3)));scene.add(new THREE.Line(trail,new THREE.LineBasicMaterial({color:0x274b36,transparent:true,opacity:.65})));
let target=new THREE.Vector3(0,0,0),velocity=new THREE.Vector3(.18,.04,-.12),lastFrame=performance.now(),nextTurn=0,glideUntil=0,restTwitchAt=0,restTwitchUntil=0;
function chooseTarget(now){if(now<nextTurn)return;const rapid=valence==='reward';nextTurn=now+(rapid?120:700)+Math.random()*(rapid?420:1550);if(!rapid&&Math.random()<.22)glideUntil=now+260+Math.random()*680;const px=pointer.x/720*6-3,py=-(pointer.y/570*4-2);if(rapid&&pointer.on)target.set(THREE.MathUtils.clamp(px,-3.3,3.3),THREE.MathUtils.clamp(py+1.6,.7,3.6),-2+Math.random()*4);else if(valence==='aversive'&&pointer.on)target.set(THREE.MathUtils.clamp(-px*.8,-3.3,3.3),THREE.MathUtils.clamp(-py*.45+1.5,.7,3.6),1.6+Math.random()*1.2);else target.set((Math.random()-.5)*6.4,.7+Math.random()*2.9,-2.5+Math.random()*5);}
function animate(now){const dt=Math.min(.05,(now-lastFrame)/1000);lastFrame=now;tick++;manualHeat*=.992;reserve=THREE.MathUtils.clamp(reserve-dt*.004,0,.99);const drive=Math.max(reward,reserve);const resting=valence==='dormant'||valence==='warming';if(!resting){chooseTarget(now);const desired=target.clone().sub(butterfly.position).normalize();const baseSpeed=valence==='reward'?1.25+drive*1.15:valence==='aversive'?.18:.36;const speed=now<glideUntil?baseSpeed*.12:baseSpeed;velocity.lerp(desired.multiplyScalar(speed),Math.min(1,dt*(valence==='reward'?7.2:1.8)));butterfly.position.addScaledVector(velocity,dt);butterfly.position.x=THREE.MathUtils.clamp(butterfly.position.x,-3.6,3.6);butterfly.position.y=THREE.MathUtils.clamp(butterfly.position.y,.6,3.8);butterfly.position.z=THREE.MathUtils.clamp(butterfly.position.z,-2.7,2.7);const yaw=Math.atan2(velocity.x,velocity.z);const bank=THREE.MathUtils.clamp(-velocity.x*.78,-.72,.72);const pitch=THREE.MathUtils.clamp(-velocity.y*.55,-.34,.34);butterfly.rotation.y+=(yaw-butterfly.rotation.y)*dt*(valence==='reward'?4.2:1.8);butterfly.rotation.z+=(bank-butterfly.rotation.z)*dt*(valence==='reward'?4.5:2);butterfly.rotation.x+=(pitch-butterfly.rotation.x)*dt*2.3;}else{butterfly.position.lerp(new THREE.Vector3(0,-1.35,0),dt*1.5);butterfly.rotation.x*=1-dt*2;butterfly.rotation.z*=1-dt*2;butterfly.rotation.y+=(Math.PI/2-butterfly.rotation.y)*dt*2;perchMesh.visible=true;}if(!resting)perchMesh.visible=false;
  const frequency=valence==='reward'?13+drive*9:valence==='aversive'?.72:valence==='warming'?.03:valence==='dormant'?.012:2.5;let flap=Math.sin(now*.001*frequency)*(valence==='reward'?.62+drive*.28:.42);if(valence==='reward')flap+=Math.sin(now*.001*31)*.16;if(valence==='warming')flap=0;if(valence==='dormant'){if(now>restTwitchAt){restTwitchAt=now+8000+Math.random()*12000;restTwitchUntil=now+350+Math.random()*550;}flap=Math.PI/2-.04+(now<restTwitchUntil?Math.sin(now*.012)*.06:0);}wings.forEach((wing,i)=>{const direction=i%2===0?-1:1;wing.rotation.y+=(direction*flap-wing.rotation.y)*Math.min(1,dt*(valence==='reward'?16:6));});
  renderer.render(scene,camera);document.querySelector('#cycle').textContent='cycle '+String(tick).padStart(5,'0');requestAnimationFrame(animate);}
function resize3d(){const r=viewport.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}new ResizeObserver(resize3d).observe(viewport);resize3d();
stage.addEventListener('pointermove',e=>{const r=viewport.getBoundingClientRect();pointer={x:(e.clientX-r.left)*720/r.width,y:(e.clientY-r.top)*570/r.height,on:true};});stage.addEventListener('pointerleave',()=>pointer.on=false);
document.querySelector('#demo').onclick=()=>text.value='CZ and Binance are building something great for the community.';document.querySelector('#feed').onclick=ingest;text.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter')ingest()});render();loadSlice();setInterval(simulatedTelemetry,4200);requestAnimationFrame(animate);
