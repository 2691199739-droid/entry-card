/* 入境卡助手 · 官方表单填表器 fill.js — 由 publish-build.py 自动生成，勿手改
   用法：由助手页「一键跳转」带 #mdacfill= 码打开官方页 → 自动读取并填入（无需粘贴） */
function bmMy(d,maxTries){
  var MT=maxTries||30;
  var banner=null;
  function note(m,s){
    if(!banner){banner=document.createElement('div');banner.style.cssText='position:fixed;left:14px;bottom:14px;z-index:2147483647;background:#0B2447;color:#fff;font:13px/1.6 system-ui,-apple-system,sans-serif;padding:12px 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-width:360px';document.body.appendChild(banner)}
    banner.textContent=m;clearTimeout(banner._t);
    if(!s)banner._t=setTimeout(function(){banner.remove();banner=null},8000);
  }
  function g(i){return document.getElementById(i)}
  function st(i,v){var e=g(i);if(!e||!v)return 0;e.value=v;if(e.type==='date'&&!e.value)e.value=String(v).split('/').reverse().join('-');e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return String(e.value)===String(v)?1:0}
  function ss(i,v){var e=g(i);if(!e||!v)return 0;return ssEl(e,v)}
  function ssEl(e,v){if(!e||!v)return 0;var val=String(v).toUpperCase().replace(/\s+/g,'');var words=String(v).toUpperCase().split(/\s+/).filter(Boolean);var o=e.options;if(!o)return 0;for(var j=0;j<o.length;j++){var ov=String(o[j].value).toUpperCase().replace(/\s+/g,'');var ot=String(o[j].text).replace(/\s+/g,' ').toUpperCase();var otc=ot.replace(/\s+/g,'');if(ov===val||otc===val||ot.indexOf(String(v).toUpperCase())>-1||ov.indexOf(val)>-1||otc.indexOf(val)>-1){e.value=o[j].value;e.dispatchEvent(new Event('change',{bubbles:true}));return 1}}for(var k=0;k<o.length;k++){var tt=String(o[k].text).toUpperCase();if(words.length&&words.every(function(w){return tt.indexOf(w)>-1})){e.value=o[k].value;e.dispatchEvent(new Event('change',{bubbles:true}));return 1}}return 0}
  /* 州代码→官方名称关键词（官方州下拉是名称体系，如 WP KUALA LUMPUR） */
  var MY_STATE_ALIAS={'01':['JOHOR'],'02':['KEDAH'],'03':['KELANTAN'],'04':['MELAKA','MALACCA'],'05':['NEGERI SEMBILAN','SEMBILAN'],'06':['PAHANG'],'07':['PULAU PINANG','PENANG'],'08':['PERAK'],'09':['PERLIS'],'10':['SELANGOR'],'11':['TERENGGANU'],'12':['SABAH'],'13':['SARAWAK'],'14':['KUALA LUMPUR'],'15':['LABUAN'],'16':['PUTRAJAYA']};
  /* 中文城市/常用缩写 → 英文（官方城市列表是英文） */
  var MY_CITY_CN2EN={'KL':'KUALA LUMPUR','吉隆坡':'KUALA LUMPUR','槟城':'PENANG','乔治市':'GEORGE TOWN','乔治敦':'GEORGE TOWN','马六甲':'MELAKA','新山':'JOHOR BAHRU','莎阿南':'SHAH ALAM','八打灵再也':'PETALING JAYA','梳邦再也':'SUBANG JAYA','巴生':'KLANG','布城':'PUTRAJAYA','亚庇':'KOTA KINABALU','古晋':'KUCHING','仙本那':'SEMPORNA','兰卡威':'LANGKAWI','云顶':'GENTING HIGHLANDS','怡保':'IPOH','芙蓉':'SEREMBAN','关丹':'KUANTAN'};
  function ssKw(e,words){if(!e||!e.options||!words||!words.length)return 0;var o=e.options;for(var wi=0;wi<words.length;wi++){var w=String(words[wi]).toUpperCase().replace(/\s+/g,' ').trim();if(!w)continue;for(var j=0;j<o.length;j++){var t=String(o[j].text||'').toUpperCase().replace(/\s+/g,' ').trim();if(t&&(t===w||t.indexOf(w)>-1)){e.value=o[j].value;e.dispatchEvent(new Event('change',{bubbles:true}));return 1}}}return 0}
  function cityKw(city){if(!city)return[];var s=String(city).trim();var en=MY_CITY_CN2EN[s]||s;return String(en).toUpperCase().split(/[\s,，/]+/).filter(Boolean)}
  function fillState(D){
    var e=g('accommodationState');
    if(!e||!D.state)return 0;
    var key=String(D.state).trim();
    var words=MY_STATE_ALIAS[key];
    if(words&&ssKw(e,words))return 1;
    if(ss('accommodationState',D.state))return 1;
    if(!/^\d+$/.test(key)&&ssKw(e,[key]))return 1;
    return 0;
  }
  function ssKwPc(e,words,pc){if(!e||!e.options)return 0;var o=e.options,hits=[];for(var j=0;j<o.length;j++){var t=String(o[j].text||'').toUpperCase().replace(/\s+/g,' ').trim();if(t&&words&&words.length&&words.every(function(w){return t.indexOf(w)>-1}))hits.push(j)}if(!hits.length)return 0;var pick=hits[0];if(pc){var pcS=String(pc).trim();for(var k=0;k<hits.length;k++){if(String(o[hits[k]].text).indexOf(pcS)>-1){pick=hits[k];break}}}e.value=o[pick].value;e.dispatchEvent(new Event('change',{bubbles:true}));return 1}
  function fillCity(D){
    var ck=cityKw(D.city);
    if(ssKwPc(g('accommodationCity'),ck,D.postcode))return 1;
    if(ss('accommodationCity',D.city))return 1;
    return tryCityAny(D);
  }
  function tryCityAny(D){
    /* 兜底：官方页 City 不一定有 id，按标签文本（city / bandar / daerah）全页找并填 */
    if(!D.city)return 0;
    var els=[].slice.call(document.querySelectorAll('select,input:not([type=hidden]):not([type=button]):not([type=submit])'));
    for(var k=0;k<els.length;k++){
      var e=els[k];
      var lb='';
      try{var l=document.querySelector('label[for="'+e.id+'"]');if(l)lb=l.textContent}catch(x1){}
      try{if(e.closest('td')&&e.closest('td').previousElementSibling)lb+=' '+e.closest('td').previousElementSibling.textContent}catch(x2){}
      lb=(lb||'').toLowerCase();
      if(lb.indexOf('city')>-1||lb.indexOf('town')>-1||lb.indexOf('bandar')>-1||lb.indexOf('daerah')>-1||lb.indexOf('district')>-1||lb.indexOf('pekan')>-1||lb.indexOf('kota')>-1||lb.indexOf('mukim')>-1){
        if(e.tagName==='SELECT'){if(ssKw(e,cityKw(D.city))||ssEl(e,D.city))return 1}
        else{var cv=cityKw(D.city);e.value=cv.length?cv.join(' '):D.city;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return 1}
      }
    }
    /* Angular / 自定义下拉：label 含 city 的容器里找可点元素展开后选可见选项 */
    var words=cityKw(D.city);
    var labels=[].slice.call(document.querySelectorAll('label'));
    for(var i=0;i<labels.length;i++){
      var t=(labels[i].textContent||'').toLowerCase();
      if(t.indexOf('city')>-1||t.indexOf('town')>-1||t.indexOf('bandar')>-1||t.indexOf('district')>-1){
        var wrap=labels[i].closest('.mat-form-field')||labels[i].parentElement;
        if(!wrap)continue;
        var trig=wrap.querySelector('[role=combobox],.mat-select,mat-select,button');
        if(!trig)continue;
        try{trig.click()}catch(e3){}
        var opts=[].slice.call(document.querySelectorAll('mat-option,.mat-option,[role=option],li[class*="option"]'));
        for(var m=0;m<opts.length;m++){
          var om=opts[m];
          try{if(om.getBoundingClientRect().height<5)continue}catch(e4){}
          var st=(om.textContent||'').toUpperCase();
          if(words.length&&words.every(function(w){return st.indexOf(w)>-1})){try{om.click()}catch(e5){}return 1}
        }
      }
    }
    return 0;
  }
  function fmt(iso){if(!iso)return '';var p=String(iso).split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:String(iso)}
  function mapData(x){return{name:x.name,passNo:x.passport,dob:fmt(x.dob),nationality:x.nationality,pob:x.pob,sex:x.sex==='Male'?'1':(x.sex==='Female'?'2':''),passExp:fmt(x.passportExp),email:x.email,confirmEmail:x.email,region:x.ccode,mobile:x.mobile,arr:fmt(x.arrival),dep:fmt(x.departure),vessel:x.flight,mode:x.mode==='Air'?'1':(x.mode==='Land'?'2':(x.mode==='Sea'?'3':'')),embark:x.lastPort,stay:x.accommodation,addr1:x.address,addr2:x.address2||'',state:x.state,city:x.city,postcode:x.postcode}}
  function directFill(D){
    var n=0,miss=[];
    var T1=[['name',D.name],['passNo',D.passNo],['dob',D.dob],['passExpDte',D.passExp],['email',D.email],['confirmEmail',D.confirmEmail],['mobile',D.mobile],['arrDt',D.arr],['depDt',D.dep],['vesselNm',D.vessel],['accommodationAddress1',D.addr1],['accommodationAddress2',D.addr2],['accommodationPostcode',D.postcode]];
    var S1=[['nationality',D.nationality],['pob',D.pob],['sex',D.sex],['trvlMode',D.mode],['embark',D.embark],['accommodationStay',D.stay]];
    T1.forEach(function(p){if(p[1]){if(st(p[0],p[1]))n++;else miss.push(p[0])}});
    S1.forEach(function(p){if(p[1]){if(ss(p[0],p[1]))n++;else miss.push(p[0])}});
    return new Promise(function(res){
      setTimeout(function(){
        if(D.region&&g('region')&&!g('region').value){if(ss('region',D.region))n++}
        if(!D.state){res({n:n,miss:miss});return}
        if(fillState(D)){
          n++;
          var tries=0,cok=0,counted=false;
          var t=setInterval(function(){
            tries++;
            if(!cok&&D.city){cok=fillCity(D)}
            if(cok&&!counted){counted=true;n++}
            if(cok||tries>=40){
              clearInterval(t);
              if(!cok&&D.city){cok=fillCity(D)}
              if(!cok&&D.postcode&&g('accommodationPostcode')&&!g('accommodationPostcode').value){if(st('accommodationPostcode',D.postcode))n++}
              if(!cok)miss.push('accommodationCity');
              res({n:n,miss:miss});
            }
          },800);
        }else{miss.push('accommodationState');res({n:n,miss:miss})}
      },900);
    });
  }
  function genericFill(D,x){
    var A=[['confirm email',D.email],['email address',D.email],['passport no',D.passNo],['passport expiry',D.passExp],['date of birth',D.dob],['place of birth',D.pob],['nationality',D.nationality],['sex',x.sex],['country code',D.region],['mobile',D.mobile],['arrival',D.arr],['departure',D.dep],['flight',D.vessel],['mode of travel',x.mode],['last port',D.embark],['accommodation',x.accommodation],['address',D.addr1],['state',x.state],['postcode',D.postcode],['city',x.city],['name',D.name]].filter(function(p){return p[1]});
    var I=[].slice.call(document.querySelectorAll('input:not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]):not([type=radio]):not([type=checkbox]):not([type=file]):not([type=image]),select,textarea'));
    var U=[],n=0;
    function T(e){
      var t=[],l;
      if(e.id){try{l=document.querySelector('label[for="'+e.id+'"]');if(l)t.push(l.textContent)}catch(x1){}}
      try{l=e.closest('label');if(l)t.push(l.textContent)}catch(x2){}
      var td=e.closest('td');if(td&&td.previousElementSibling)t.push(td.previousElementSibling.textContent);
      if(e.placeholder)t.push(e.placeholder);
      if(e.getAttribute('aria-label'))t.push(e.getAttribute('aria-label'));
      t.push(e.name||'');t.push(e.id||'');
      return t.join(' ').toLowerCase();
    }
    function S(e,v){
      if(e.tagName==='SELECT'){
        var o=e.options;
        for(var j=0;j<o.length;j++){
          if(o[j].text.toLowerCase().indexOf(String(v).toLowerCase())>-1){e.value=o[j].value;e.dispatchEvent(new Event('change',{bubbles:true}));return 1}
        }
        return 0;
      }
      e.value=v;
      if(e.type==='date'&&!e.value)e.value=String(v).split('/').reverse().join('-');
      e.dispatchEvent(new Event('input',{bubbles:true}));
      e.dispatchEvent(new Event('change',{bubbles:true}));
      return 1;
    }
    A.forEach(function(p){
      var a=p[0],v=p[1];
      for(var i=0;i<I.length;i++){
        var e=I[i];
        if(U.indexOf(e)>-1)continue;
        if(T(e).indexOf(a)>-1){U.push(e);n+=S(e,v);break}
      }
    });
    return Promise.resolve({n:n,miss:[]});
  }
  function doFill(){
    closeModals();
    var D=mapData(d);
    note('MDAC 助手正在自动填入…',true);
    /* 官网表单在填写过程中会重渲染（国家/日期联动），一轮填不全就补填，最多 5 轮 */
    var round=0;
    function run(){
      round++;
      closeModals();
      /* 官方页可能改版（旧 id 与 label 两种结构都可能出现）：
         旧 id 直填与通用 label 匹配两条路径都跑，取填入项多的结果 */
      Promise.all([directFill(D),genericFill(D,d)]).then(function(rs){
        var r=rs[0].n>=rs[1].n?rs[0]:rs[1];
        if(round<5&&r.miss&&r.miss.length){setTimeout(run,1200);return}
        var m=r.miss&&r.miss.length
          ?('MDAC 助手：已自动填入，未能填入：'+r.miss.join(', ')+'，请手动补填。请核对后自行提交。')
          :'MDAC 助手：已自动填入全部资料。请核对后自行提交。';
        note(m,true);
      });
    }
    run();
  }
  var tries=0;
  /* 官网首页弹公告/广告弹窗（Bootstrap modal）：多策略自动关闭，避免挡住 REGISTER */
  function closeModals(){
    try{
      var m=document.getElementById('myModal');
      if(m&&m.classList&&m.classList.contains('in')){
        try{ if(window.jQuery){window.jQuery('#myModal').modal('hide')} }catch(e){}
        var cs=m.querySelectorAll('.close,[data-dismiss="modal"]');
        for(var i=0;i<cs.length;i++){try{cs[i].click()}catch(e){}}
        try{
          m.classList.remove('in');
          m.style.display='none';
          document.body.classList.remove('modal-open');
          var bd=document.querySelectorAll('.modal-backdrop');
          for(var j=0;j<bd.length;j++){try{bd[j].remove()}catch(e){}}
        }catch(e){}
      }
      /* 页面可能不止一个公告弹窗：其它可见 modal 同样处理 */
      var others=document.querySelectorAll('.modal.in:not(#myModal), .modal.show');
      for(var k=0;k<others.length;k++){
        var o=others[k];
        try{
          var c2=o.querySelectorAll('.close,[data-dismiss="modal"]');
          for(var q=0;q<c2.length;q++){try{c2[q].click()}catch(e){}}
          try{o.classList.remove('in');o.classList.remove('show');o.style.display='none'}catch(e){}
        }catch(e){}
      }
    }catch(e){}
  }
  /* 公告弹窗关掉后，自动点击 REGISTER / REGISTRATION 进入申报表单页。
     网络慢适配：按钮必须可见才点；点一次后 12 秒内不再重复点，避免官网还没加载好被连续点击 */
  function clickRegister(){
    try{
      var now=+new Date();
      if(window.__regLastClick && now-window.__regLastClick<12000)return false;
      var btns=document.querySelectorAll('button,a,[role="button"]');
      for(var i=0;i<btns.length;i++){
        var b=btns[i];
        var t=(b.textContent||'').trim().toUpperCase().replace(/\s+/g,' ');
        if(t==='REGISTER'||t==='REGISTRATION'){
          if(!(b.offsetWidth||b.offsetHeight))continue;
          window.__regLastClick=now;
          b.click();
          return true;
        }
      }
    }catch(e){}
    return false;
  }
  var t=setInterval(function(){
    tries++;
    var modalVisible=false;
    try{
      var m0=document.getElementById('myModal');
      modalVisible=!!(m0&&m0.classList.contains('in')&&(m0.offsetWidth||m0.offsetHeight));
    }catch(e){}
    closeModals();
    if(g('name')||g('passNo')||document.querySelector('form[name="permohonan"]')){clearInterval(t);doFill();return}
    /* 网络慢适配：弹窗已消失 + 页面完全加载 + 脚本启动满 2 轮（3 秒）后，才尝试自动点 REGISTER */
    if(!modalVisible && document.readyState==='complete' && tries>=2){clickRegister()}
    if(tries===1){note('MDAC 助手已就绪：公告弹窗将自动关闭，页面加载完成后自动点击 REGISTER 进入申报表单页，表单一出现即自动填入（网络慢时会自动等待重试）',true)}
    if(tries>=MT){clearInterval(t);note('MDAC 助手：等待表单超时。若页面仍被弹窗遮挡，请点弹窗右上角 ×；再点官网 REGISTER 进入申报表单页；表单出现后如未自动填入，请刷新本页重试',true)}
  },1500);
}
function bmTh(d){
  var banner=null;
  function note(m,s){
    if(!banner){banner=document.createElement('div');banner.style.cssText='position:fixed;left:14px;bottom:14px;z-index:2147483647;background:#0B2447;color:#fff;font:13px/1.6 system-ui,-apple-system,sans-serif;padding:12px 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-width:360px';document.body.appendChild(banner)}
    banner.textContent=m;clearTimeout(banner._t);
    if(!s)banner._t=setTimeout(function(){banner.remove();banner=null},8000);
  }
  function fmt(iso){if(!iso)return '';var p=String(iso).split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:String(iso)}
  function fcAny(names){
    for(var i=0;i<names.length;i++){
      var el=document.querySelector('input[formcontrolname="'+names[i]+'"], textarea[formcontrolname="'+names[i]+'"]');
      if(el)return el;
      var host=document.querySelector('[formcontrolname="'+names[i]+'"]');
      if(host){var inp=host.querySelector('input, textarea');if(inp)return inp}
    }
    return null;
  }
  function vis(el){if(!el)return false;var r=el.getBoundingClientRect();return r.width>=10&&r.height>=10}
  function setNg(el,v){if(!el)return 0;try{el.focus()}catch(e){}el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));try{el.blur()}catch(e2){}return 1}
  function pick(val,cb,tries){
    var n=0,T=tries||10;
    var t=setInterval(function(){
      n++;
      var cands=[].slice.call(document.querySelectorAll('mat-option,.mat-option,sit-option,[class*="option"]')).filter(function(o){
        if(!vis(o))return false;
        var s=(o.textContent||'').trim();
        if(!s||s.length>60)return false;
        return s.toUpperCase().indexOf(String(val).toUpperCase())>-1;
      });
      if(cands.length){
        cands.sort(function(a,b){return (a.textContent||'').trim().length-(b.textContent||'').trim().length});
        cands[0].click();clearInterval(t);cb(1);return;
      }
      if(n>=T){clearInterval(t);cb(0)}
    },320);
  }
  function ana(names,vals,cb){
    var el=fcAny(names);
    if(!el)return cb(0);
    try{el.scrollIntoView({block:'center'})}catch(e){}
    try{el.focus()}catch(e2){}
    el.value=vals[0];
    el.dispatchEvent(new Event('input',{bubbles:true}));
    pick(vals[0],function(ok){
      if(ok)return cb(1);
      if(vals.length>1){
        el.value=vals[1];
        el.dispatchEvent(new Event('input',{bubbles:true}));
        pick(vals[1],function(ok2){
          if(ok2)return cb(1);
          el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));
          cb(0);
        },6);
        return;
      }
      el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));
      cb(0);
    });
  }
  function optRow(name,val,cb){
    var row=document.querySelector('[formcontrolname="'+name+'"]');
    if(!row)return cb(0);
    try{row.scrollIntoView({block:'center'})}catch(e){}
    var kids=[].slice.call(row.querySelectorAll('*')).filter(function(o){
      if(!vis(o))return false;
      var s=(o.textContent||'').trim();
      if(!s||s.length>40)return false;
      return s.toUpperCase().indexOf(String(val).toUpperCase())>-1;
    });
    if(kids.length){
      kids.sort(function(a,b){return (a.textContent||'').trim().length-(b.textContent||'').trim().length});
      kids[0].click();setTimeout(function(){cb(1)},250);return;
    }
    cb(0);
  }
  function sel(name,vals,cb){
    var host=document.querySelector('[formcontrolname="'+name+'"]');
    if(!host)return cb(0);
    try{host.scrollIntoView({block:'center'})}catch(e){}
    host.click();
    setTimeout(function(){
      pick(vals[0],function(ok){
        if(ok)return cb(1);
        if(vals.length>1){
          host.click();
          setTimeout(function(){pick(vals[1],function(ok2){cb(ok2)},8)},400);
          return;
        }
        cb(0);
      },8);
    },400);
  }
  function datePick(names,dmy,cb){
    var el=fcAny(names);
    if(!el)return cb(0);
    try{el.scrollIntoView({block:'center'})}catch(e){}
    try{el.focus()}catch(e2){}
    el.value=dmy;
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
    try{el.blur()}catch(e3){}
    setTimeout(function(){cb(el.value?1:0)},500);
  }
  function seq(steps,done){(function next(i){if(i>=steps.length){done();return}steps[i](function(){next(i+1)})})(0)}
  function stepperNext(cb){
    var btn=document.querySelector('button[matsteppernext], .next-button:not([disabled])');
    if(btn){try{btn.scrollIntoView({block:'center'})}catch(e){}btn.click()}
    setTimeout(cb,900);
  }
  var TH_MON=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  function thaiFill(){
    var n=0,miss=[];
    function ok(x,name){if(x)n++;else miss.push(name)}
    ok(setNg(fcAny(['familyName']),(d.surName||d.name||'').toUpperCase()),'familyName');
    ok(setNg(fcAny(['firstName']),(d.givenName||'').toUpperCase()),'firstName');
    ok(setNg(fcAny(['passportNo']),d.passport||''),'passportNo');
    if(d.occupation)ok(setNg(fcAny(['occupation']),String(d.occupation).toUpperCase()),'occupation');
    if(d.ccode)ok(setNg(fcAny(['phoneCode']),d.ccode),'phoneCode');
    if(d.mobile)ok(setNg(fcAny(['phoneNo']),d.mobile),'phoneNo');
    if(d.flight)ok(setNg(fcAny(['flightNo']),d.flight),'flightNo');
    if(d.deptflight)ok(setNg(fcAny(['deptFlightNo']),d.deptflight),'deptFlightNo');
    if(d.postcode)ok(setNg(fcAny(['accPostCode']),d.postcode),'accPostCode');
    if(d.accAddress||d.address)ok(setNg(fcAny(['accAddress']),(d.accAddress||d.address).slice(0,215)),'accAddress');
    if(d.email)ok(setNg(fcAny(['sendTo']),d.email),'sendTo');
    var dob=String(d.dob||'').split('-');
    var steps=[];
    if(dob.length===3){
      steps.push(function(cb){ana(['bdDateYear','bdYear'],[dob[0]],function(x){ok(x,'出生年');cb()})});
      steps.push(function(cb){ana(['bdDateMonth','bdMonth'],[TH_MON[+dob[1]-1]||'',dob[1]],function(x){ok(x,'出生月');cb()})});
      steps.push(function(cb){ana(['bdDateDay','bdDay'],[dob[2]],function(x){ok(x,'出生日');cb()})});
    }
    steps.push(function(cb){ana(['nationalityDesc'],['CHINA'],function(x){ok(x,'nationality');cb()})});
    steps.push(function(cb){optRow('gender',d.sex==='Female'?'FEMALE':'MALE',function(x){ok(x,'gender');cb()})});
    steps.push(function(cb){stepperNext(cb)});
    steps.push(function(cb){datePick(['arrDate'],fmt(d.arrival),function(x){ok(x,'arrDate');cb()})});
    steps.push(function(cb){datePick(['deptDate'],fmt(d.departure),function(x){ok(x,'deptDate');cb()})});
    steps.push(function(cb){optRow('traModeId',d.mode?String(d.mode).toUpperCase():'AIR',function(x){ok(x,'traMode(出行方式)');cb()})});
    steps.push(function(cb){optRow('deptTraModeId',d.mode?String(d.mode).toUpperCase():'AIR',function(x){ok(x,'deptTraMode(离境方式)');cb()})});
    if(d.purpose)steps.push(function(cb){sel('traPurposeId',[d.purpose],function(x){ok(x,'traPurpose(旅行目的)');cb()})});
    if(d.lastPortName)steps.push(function(cb){ana(['countryBoardDesc'],[String(d.lastPortName).toUpperCase()],function(x){ok(x,'countryBoard(出发国家)');cb()})});
    steps.push(function(cb){stepperNext(cb)});
    var accKw=d.accommodation==='02'?['FRIEND','RELATIVE']:(d.accommodation==='99'?['OTHER']:['HOTEL']);
    steps.push(function(cb){sel('accTypeId',accKw,function(x){ok(x,'accType(住宿类型)');cb()})});
    if(d.state)steps.push(function(cb){ana(['accProvinceDesc'],[d.state],function(x){ok(x,'accProvince(府)');cb()})});
    if(d.city)steps.push(function(cb){ana(['accDistrictDesc','accDistrict'],[d.city],function(x){ok(x,'accDistrict(县/区)');cb()})});
    seq(steps,function(){
      var m='TDAC 助手：已自动填入 '+n+' 项';
      if(miss.length)m+='；未自动选上：'+miss.join('、')+'，请手动点选补齐';
      m+='。健康申报与声明勾选请自行确认，核对无误后自行提交。';
      note(m,true);
    });
  }
  var ticks=0,filled=false,readyShown=false;
  var timer=null;
  function tryFill(){
    if(filled)return;
    ticks++;
    if(ticks>400){clearInterval(timer);return}
    var form=document.querySelector('input[formcontrolname="passportNo"], [formcontrolname="passportNo"]');
    if(!form){
      if(!readyShown){readyShown=true;note('TDAC 助手已就绪：请在页面完成人机验证并点击 Arrival Card，表单打开后自动填入',true)}
      return;
    }
    filled=true;
    note('TDAC 助手正在自动填入…',true);
    setTimeout(thaiFill,600);
  }
  timer=setInterval(tryFill,1500);
  window.addEventListener('hashchange',function(){setTimeout(tryFill,800)});
  tryFill();
}
(function(){
  function bail(m){try{alert(m)}catch(e){}}
  function dec(t){
    var d=null;
    try{d=JSON.parse(decodeURIComponent(escape(atob(t))))}catch(e){}
    return d;
  }
  /* 一键跳转：链接 #mdacfill= 里的填表码存入 sessionStorage，跨 REGISTER 整页跳转不丢 */
  function pickAuto(){
    var d=null;
    try{
      var hm=location.hash.match(/mdacfill=([^&#]*)/);
      if(hm){
        var raw='';
        try{raw=decodeURIComponent(hm[1])}catch(e){raw=hm[1]}
        if(raw){
          d=dec(raw);
          if(d&&d.passport){try{sessionStorage.setItem('mdac_fill',raw)}catch(e){}}
        }
      }
    }catch(e){}
    if(!d||!d.passport){
      try{
        var sv=sessionStorage.getItem('mdac_fill');
        if(sv){d=dec(sv)}
      }catch(e){}
    }
    return (d&&d.passport)?d:null;
  }
  window.__entryFill=function(autoMode){
    try{
      if(!document.body){bail('页面还没加载完：请等页面完全显示后再试');return}
      var d=pickAuto();
      if(!d&&!autoMode){
        var c=null;
        try{c=prompt('入境卡填表：请长按粘贴填表码（已在助手页面点「生成填表码」复制）','')}catch(e){}
        if(!c||!String(c).trim())return;
        d=dec(String(c).trim());
        if(!d||!d.passport){bail('填表码无效：请回到入境卡助手页面，重新点「生成填表码」复制后再试');return}
      }
      if(!d)return;
      if(d.dest==='TH'){
        bmTh(d);
        return;
      }
      /* 马来西亚：官网首页与表单页都会进入等待，REGISTER 后表单一出现即自动填入 */
      bmMy(d,autoMode?180:30);
    }catch(e){bail('填表脚本出错：'+(e&&e.message?e.message:'未知错误')+'。请截图反馈给管理员')}
  };
  if(window.__entryFillLoaded){window.__entryFill()}else{window.__entryFillLoaded=1;window.__entryFill()}
})();
