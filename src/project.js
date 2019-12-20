window.__require=function t(e,a,n){function o(i,r){if(!a[i]){if(!e[i]){var l=i.split("/");if(l=l[l.length-1],!e[l]){var s="function"==typeof __require&&__require;if(!r&&s)return s(l,!0);if(c)return c(l,!0);throw new Error("Cannot find module '"+i+"'")}}var u=a[i]={exports:{}};e[i][0].call(u.exports,function(t){return o(e[i][1][t]||t)},u,u.exports,t,e,a,n)}return a[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<n.length;i++)o(n[i]);return o}({Api:[function(t,e,a){"use strict";cc._RF.push(e,"5ba8060fsVLq4GR27vA3rnI","Api");var n=t("Global");e.exports={post:function(t,e){e.token=n.token?n.token:"";var a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch("https://blackjack21.hopto.org/v1/"+t,a).then(function(t){return t.json()})}},cc._RF.pop()},{Global:"Global"}],Bet:[function(t,e,a){"use strict";cc._RF.push(e,"e7be51jipBB35qq8X7MlHOf","Bet");var n=t("../api/Ws"),o=t("Global");cc.Class({extends:cc.Component,properties:{balanceLabel:{default:null,type:cc.Label},amountLabel:{default:null,type:cc.Label},button:cc.Button,bet:cc.Integer},onLoad:function(){this.button.node.on("click",this.callback,this)},callback:function(t){var e=parseInt(this.bet);if(!(o.balance<e)){o.balance=o.balance-e;var a=parseInt(this.amountLabel.string)+e;this.amountLabel.string=a;var c={cmd:"Bet",betAmount:a};n.send(c)}},start:function(){}}),cc._RF.pop()},{"../api/Ws":"Ws",Global:"Global"}],BtnLogin:[function(t,e,a){"use strict";cc._RF.push(e,"672544/yr1DLqZNjbUZB1/+","BtnLogin");var n=t("../api/Api"),o=t("Global");cc.Class({extends:cc.Component,properties:{username:{default:null,type:cc.EditBox},password:{default:null,type:cc.EditBox},button:cc.Button},onLoad:function(){this.button.node.on("click",this.callback,this)},callback:function(t){t.detail;var e={username:this.username.string,password:this.password.string};n.post("login",e).then(function(t){200==t.code&&(o.token=t.data.token,cc.director.loadScene("table"))}).catch(function(t){console.log(t)})},start:function(){}}),cc._RF.pop()},{"../api/Api":"Api",Global:"Global"}],BtnRegister:[function(t,e,a){"use strict";cc._RF.push(e,"e8bc1ANtv1JGLuBA2ofuptw","BtnRegister");var n=t("../api/Api"),o=t("Global");cc.Class({extends:cc.Component,properties:{username:{default:null,type:cc.EditBox},password:{default:null,type:cc.EditBox},button:cc.Button},onLoad:function(){this.button.node.on("click",this.callback,this)},callback:function(t){t.detail;var e={username:this.username.string,password:this.password.string};n.post("register",e).then(function(t){200==t.code&&(o.token=t.data.token,cc.director.loadScene("table"))}).catch(function(t){console.log(t)})},start:function(){}}),cc._RF.pop()},{"../api/Api":"Api",Global:"Global"}],CardPic:[function(t,e,a){"use strict";cc._RF.push(e,"679e4uEbBJGdYeVm1r3XJMv","CardPic"),cc.Class({extends:cc.Component,properties:{point:cc.Label,suit:cc.Sprite,mainPic:cc.Sprite,cardBG:cc.Sprite,redTextColor:cc.Color.WHITE,blackTextColor:cc.Color.WHITE,texFrontBG:cc.SpriteFrame,texBackBG:cc.SpriteFrame,texFaces:{default:[],type:cc.SpriteFrame},texSuitBig:{default:[],type:cc.SpriteFrame},texSuitSmall:{default:[],type:cc.SpriteFrame}},init:function(t){var e=t.point>10;this.mainPic.spriteFrame=e?this.texFaces[t.point-10-1]:this.texSuitBig[t.suit],this.point.string=t.pointName,t.isRedSuit?this.point.node.color=this.redTextColor:this.point.node.color=this.blackTextColor,this.suit.spriteFrame=this.texSuitSmall[t.suit]},reveal:function(t){this.point.node.active=t,this.suit.node.active=t,this.mainPic.node.active=t,this.cardBG.spriteFrame=t?this.texFrontBG:this.texBackBG}}),cc._RF.pop()},{}],Card:[function(t,e,a){"use strict";cc._RF.push(e,"ecd42aIDKJEu48PnoPuwXKn","Card");var n=t("../api/Ws"),o=t("Global"),c={H:1,D:3,S:0,C:2},i=["","A","2","3","4","5","6","7","8","9","10","J","Q","K"];cc.Class({extends:cc.Component,properties:{cardPrefab:cc.Prefab,playerAnchors:{default:[],type:cc.Node},bankerAnchor:cc.Node},onLoad:function(){var t=this;o.playerCards=[[],[],[],[],[]],o.bankerCards=[],n.on("Deal",function(e){1===e.status&&(e.player<0?o.bankerCards.push(e.card):o.playerCards[e.player].push(e.card),t.drawPlayerCard(),t.drawBankerCard())}),n.on("Result",function(e){1===e.status&&(e.result.forEach(function(t){t.player>0?o.playerCards[t.player]=t.cards:o.bankerCards=t.cards}),t.drawPlayerCard(),t.drawBankerCard())})},drawPlayerCard:function(){for(var t=0;t<o.playerCards.length;t++){var e={point:0,pointName:1,isRedSuit:1,suit:0};this.playerAnchors[t].removeAllChildren();for(var a=0;a<o.playerCards[t].length;a++){var n=o.playerCards[t][a];if("*"!=n){var r=n.substring(0,1),l=parseInt(n.substring(1));e={point:l,pointName:i[l],isRedSuit:c[r]%2==1,suit:c[r]}}var s=cc.instantiate(this.cardPrefab);this.playerAnchors[t].addChild(s),s.position=cc.v2(20*a,-25*a);var u=s.getComponent("CardPic");u.init(e),u.reveal("*"!=n)}}},drawBankerCard:function(){var t={point:0,pointName:1,isRedSuit:1,suit:0};this.bankerAnchor.removeAllChildren();for(var e=0;e<o.bankerCards.length;e++){var a=o.bankerCards[e];if("*"!=a){var n=a.substring(0,1),r=parseInt(a.substring(1));t={point:r,pointName:i[r],isRedSuit:c[n]%2==1,suit:c[n]}}var l=cc.instantiate(this.cardPrefab);this.bankerAnchor.addChild(l),l.position=cc.v2(50*e,0);var s=l.getComponent("CardPic");s.init(t),s.reveal("*"!=a)}},update:function(t){}}),cc._RF.pop()},{"../api/Ws":"Ws",Global:"Global"}],CountDown:[function(t,e,a){"use strict";cc._RF.push(e,"0a3f75uxEhC4bbGM+GymXdT","CountDown");var n=t("../api/Ws"),o=t("Global");cc.Class({extends:cc.Component,properties:{CountDownLabel:cc.Label,bankerCard:cc.Node,playerCard:{default:[],type:cc.Node}},onLoad:function(){var t=this;n.on("CountDownStart",function(e){e.status<=0||(t.CountDownLabel.string=e.left>0?e.left:"",t.playerCard.forEach(function(t){t.removeAllChildren()}),t.bankerCard.removeAllChildren(),o.playerCards=[[],[],[],[],[]],o.bankerCards=[])})},start:function(){}}),cc._RF.pop()},{"../api/Ws":"Ws",Global:"Global"}],Global:[function(t,e,a){"use strict";cc._RF.push(e,"bfb4fXQpcNNz5E/tEE7K1bC","Global");var n="";e.exports={setToken:function(t){n=t},getToken:function(){return n}},cc._RF.pop()},{}],HitStand:[function(t,e,a){"use strict";cc._RF.push(e,"c8346zaB6lNCohqTNqBcUJW","HitStand");var n=t("../api/Ws");t("Global");cc.Class({extends:cc.Component,properties:{button:cc.Button,command:cc.String},onLoad:function(){this.button.node.on("click",this.callback,this)},callback:function(t){var e={cmd:this.command};n.send(e)},start:function(){}}),cc._RF.pop()},{"../api/Ws":"Ws",Global:"Global"}],Player:[function(t,e,a){"use strict";cc._RF.push(e,"7f811FaAOtCVawLrt4H/11N","Player");var n=t("../api/Ws");cc.Class({extends:cc.Component,properties:{Player1Label:cc.Label,Player2Label:cc.Label,Player3Label:cc.Label,Player4Label:cc.Label,Player5Label:cc.Label},onLoad:function(){var t=this;n.on("TablePlayer",function(e){1===e.status&&(t.Player1Label.string=e.players[0].name,t.Player2Label.string=e.players[1].name,t.Player3Label.string=e.players[2].name,t.Player4Label.string=e.players[3].name,t.Player5Label.string=e.players[4].name)}),n.on("Turn",function(e){if(1===e.status){var a=new cc.color(255,255,0),n=new cc.color(255,255,255);t.Player1Label.node.color=0===e.index?a:n,t.Player2Label.node.color=1===e.index?a:n,t.Player3Label.node.color=2===e.index?a:n,t.Player4Label.node.color=3===e.index?a:n,t.Player5Label.node.color=4===e.index?a:n}})},start:function(){}}),cc._RF.pop()},{"../api/Ws":"Ws"}],Table:[function(t,e,a){"use strict";cc._RF.push(e,"bf81cj59KZJHINX0I7Q3HDl","Table");var n=t("../api/Api"),o=t("Global"),c=t("../api/Ws");cc.Class({extends:cc.Component,properties:{balanceLabel:{default:null,type:cc.Label},amountLabel:{default:null,type:cc.Label},labelB:{default:null,type:cc.Label},label1:{default:null,type:cc.Label},label2:{default:null,type:cc.Label},label3:{default:null,type:cc.Label},label4:{default:null,type:cc.Label},label5:{default:null,type:cc.Label}},onLoad:function(){var t=this;o.balance||(o.balance=0),o.tableIndex||(o.tableIndex=0),o.position||(o.position=0),this.getBalance(),c.on("Join",function(e){e.status<=0&&(o.position++,o.position<5&&t.join())}),c.on("NewGame",function(e){1==e.status&&(t.amountLabel.string="0",t.getBalance())}),this.join()},getBalance:function(){n.post("balance",{}).then(function(t){200==t.code&&(o.balance=t.data.balance)}).catch(function(t){console.log(t)})},join:function(){var t={cmd:"Join",table:0,position:o.position};c.send(t)},update:function(t){this.balanceLabel.string=o.balance}}),cc._RF.pop()},{"../api/Api":"Api","../api/Ws":"Ws",Global:"Global"}],Ws:[function(t,e,a){"use strict";cc._RF.push(e,"a7d68UrhRFFxrwf7h2zPKty","Ws");var n,o=t("Global"),c="wss://blackjack21.hopto.org/v1/play",i={};(function t(){(n=new WebSocket(c)).onopen=function(){console.log("open connection")},n.onclose=function(){console.log("close connection"),setTimeout(function(){t()},1e3)},n.onmessage=function(t){console.log(t);var e=JSON.parse(t.data);i[e.cmd]&&i[e.cmd](e)}})(),e.exports={on:function(t,e){i[t]=e},send:function(t){t.token=o.token,n.send(JSON.stringify(t))}},cc._RF.pop()},{Global:"Global"}]},{},["Api","Global","Ws","BtnLogin","BtnRegister","Bet","Card","CardPic","CountDown","HitStand","Player","Table"]);