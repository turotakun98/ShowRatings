(this.webpackJsonpshowratings=this.webpackJsonpshowratings||[]).push([[0],{22:function(e,t){e.exports={omdbApiKey:"9d0c36f2"}},30:function(e,t,a){e.exports=a.p+"static/media/iconImageNotFound.f15f4943.png"},49:function(e,t,a){e.exports=a(68)},54:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(17),o=a.n(i),r=(a(54),a(7)),l=a.n(r),c=a(16),u=a(5),h=a(13),d=a(8),m=a(15),p=a(14),b=(a(56),a(57),function e(t,a,n,s){Object(u.a)(this,e),this.idImdb=t,this.title=a,this.years=n,this.imageLink=s});b.prototype.toString=function(){return"Id: ".concat(this.idImdb,", ").concat(this.title," (").concat(this.years,") '").concat(this.imageLink,"'")};var g=b,f=a(22),v=a.n(f);function y(e){return E.apply(this,arguments)}function E(){return(E=Object(c.a)(l.a.mark((function e(t){var a,n,s,i,o,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.replace(/\s/g,"+"),n="https://www.omdbapi.com/?type=series&apikey="+v.a.omdbApiKey+"&s="+a,e.next=4,fetch(n);case 4:return s=e.sent,e.next=7,s.json();case 7:if(i=e.sent,o=[],i&&"True"===i.Response&&i.Search)for(r=0;r<i.Search.length;r++)c=new g(i.Search[r].imdbID,i.Search[r].Title,i.Search[r].Year,"N/A"!==i.Search[r].Poster?i.Search[r].Poster:""),o.push(c);return e.abrupt("return",o);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=a(30),w=a.n(k),S=a(91),C=a(44),O=a.n(C),x=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={text:"",suggestions:[],showSuggestions:!0},n.handleFocus=function(e){n.setState({showSuggestions:!0})},n.handleBlur=function(e){n.setState({showSuggestions:!1})},n.handleTextChange=n.handleTextChange.bind(Object(d.a)(n)),n.cancelSearch=n.cancelSearch.bind(Object(d.a)(n)),n}return Object(h.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"SearchBar",onBlur:this.handleBlur,onFocus:this.handleFocus,style:this.props.style},s.a.createElement("input",{autoFocus:!0,ref:function(t){e.searchInput=t},type:"text",placeholder:"Search TV show...",onChange:this.handleTextChange,value:this.state.text}),s.a.createElement(S.a,{onClick:this.cancelSearch,style:{width:40,height:40,float:"right"}},s.a.createElement(O.a,{fontSize:"small"})),this.renderSuggestion())}},{key:"cancelSearch",value:function(){var e=this;this.setState({text:"",suggestions:[],showSuggestions:!1},(function(){e.searchInput.focus()}))}},{key:"handleTextChange",value:function(){var e=Object(c.a)(l.a.mark((function e(t){var a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({text:t.target.value},Object(c.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.state.text){e.next=7;break}return e.next=3,y(a.state.text.toLowerCase());case 3:(t=e.sent)&&a.setState({suggestions:t}),e.next=8;break;case 7:a.setState({suggestions:[]});case 8:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleClick",value:function(e){var t=this.state.suggestions[e];this.setState({text:t.title}),this.props.onSearch(t)}},{key:"renderSuggestion",value:function(){var e=this,t=this.state.suggestions,a=this.state.showSuggestions;return 0!==t.length&&a?s.a.createElement("ul",null,this.state.suggestions.map((function(t,a){return s.a.createElement("li",{onMouseDown:function(){return e.handleClick(a)},key:"li"+t.idImdb},s.a.createElement("div",{className:"BasicContainer"},s.a.createElement("img",{src:t.imageLink||w.a,key:"img"+t.idImdb,alt:t.imageLink?t.title:""}),s.a.createElement("div",{className:"TitleContainer"},s.a.createElement("h4",null,"".concat(t.title)),s.a.createElement("h5",null,"".concat(t.years)))))}))):null}}]),a}(n.Component),j=(a(63),a(64),function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return s.a.createElement("td",{className:this.setBackgroundColorRating()+(this.props.rotated?" cellRotated":"")},s.a.createElement("div",{className:"cellSquare"},this.renderEpisodeCell()))}},{key:"renderEpisodeCell",value:function(){return s.a.createElement("a",{href:this.props.episodeInfo.link,target:"_blank",rel:"noopener noreferrer",className:"noUnderline"},s.a.createElement("div",{title:this.getTitleValue(),className:"cellContainer"},s.a.createElement("h6",{className:this.props.countVisible?"rateLabel":"rateLabelFull"},this.props.episodeInfo.rating?this.props.episodeInfo.rating:"N.A"),this.props.countVisible?s.a.createElement("h6",{className:"rateCountLabel"},this.getRatingCountValue()):s.a.createElement("span",null)))}},{key:"getTitleValue",value:function(){return"S".concat(this.props.episodeInfo.season,", E").concat(this.props.episodeInfo.number,", ").concat(this.props.episodeInfo.title)}},{key:"getRatingCountValue",value:function(){var e=this.props.episodeInfo.ratingCount;return e?e.length>3?e.substring(0,4)+"k":e:"N.A."}},{key:"setBackgroundColorRating",value:function(){var e=this.props.episodeInfo.rating;return e>=8.6?"rateGreat":e>=7.6&&e<=8.5?"rateGood":e>=6.6&&e<=7.5?"rateRegular":e>=5&&e<=6.5?"rateBad":e>=.1&&e<=4.9?"rateGarbage":"rateUndefined"}}]),a}(n.Component)),I=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return this.renderEpisodesSeasons()}},{key:"shouldComponentUpdate",value:function(e,t){return(this.props.rotate!==e.rotate||null==this.props.episodesList||this.props.episodesList!==e.episodesList||this.props.countVisible!==e.countVisible)&&(this.props.episodesList!==e.episodesList&&this.props.onLoad(),!0)}},{key:"renderEpisodesSeasons",value:function(){var e=this.props.episodesList;return console.log("episodesList",e),e&&0!==e.length?s.a.createElement("table",{id:this.props.id,className:this.getClassName()},s.a.createElement("thead",null,s.a.createElement("tr",null,this.renderHeader())),s.a.createElement("tbody",null,this.renderSeason())):s.a.createElement("h1",null," ")}},{key:"getClassName",value:function(){return this.props.className?this.props.className:""}},{key:"renderHeader",value:function(){var e=this.getMinMaxEpisodeNumber(),t=e[0],a=e[1],n=[];n.push(s.a.createElement("th",{key:"ESHseparator",className:this.props.rotate?"cellRotated":""},s.a.createElement("div",{className:"cellSquare"})));for(var i=t;i<=a;i++)n.push(s.a.createElement("th",{key:"EH"+i,className:this.props.rotate?"cellRotated":""},s.a.createElement("div",{className:"cellSquare"},s.a.createElement("h6",{className:"headerLabel"},"E",i))));return n}},{key:"getMinMaxEpisodeNumber",value:function(){var e=this.props.episodesList,t=-1/0;for(var a in e){var n=e[a].length;n>t&&(t=n)}return[1,t]}},{key:"renderSeason",value:function(){var e=this,t=this.props.episodesList;return Object.keys(t).map((function(t){return s.a.createElement("tr",{key:t},s.a.createElement("th",{key:"S"+t,className:e.props.rotate?"cellRotated":""},s.a.createElement("div",{className:"cellSquare"},s.a.createElement("h6",{className:"headerLabel"},"S",t))),e.renderEpisodes(e.props.episodesList[t]))}))}},{key:"renderEpisodes",value:function(e){var t=this;return e.sort((function(e,t){return Math.floor(e.number)-Math.floor(t.number)})).map((function(e){return s.a.createElement(j,{key:"S"+e.season+"E"+e.number,episodeInfo:e,rotated:t.props.rotate,countVisible:t.props.countVisible})}))}}]),a}(n.Component),N=(a(65),function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return this.props.loading?s.a.createElement("div",{className:"lds-container"},s.a.createElement("div",{className:"lds-ring"},s.a.createElement("div",null),s.a.createElement("div",null),s.a.createElement("div",null),s.a.createElement("div",null))):s.a.createElement("span",null)}}]),a}(n.Component)),L=(a(66),a(93)),z=a(4),R=a(45),V=a.n(R),W=a(36),T=a.n(W),B=a(37),H=a.n(B),Z=150,D=50,P=100,M=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={zoom:100,rotate:!1,visible:!1,baseHeight:0,baseWidth:0,pageWidth:0,divWidth:0,countVisible:!1,centerPanelX:0},n.zoomIn=n.zoomIn.bind(Object(d.a)(n)),n.zoomOut=n.zoomOut.bind(Object(d.a)(n)),n.rotateTable=n.rotateTable.bind(Object(d.a)(n)),n.episodesLoaded=n.episodesLoaded.bind(Object(d.a)(n)),n.handleZoom=n.handleZoom.bind(Object(d.a)(n)),n.handleCountVisibility=n.handleCountVisibility.bind(Object(d.a)(n)),n.updateWindowDimensions=n.updateWindowDimensions.bind(Object(d.a)(n)),n}return Object(h.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{id:"tableContainer",className:"col-md-10"+(this.state.visible?"":" d-none")+(this.state.baseWidth>this.state.divWidth?" panelContainer":"")},s.a.createElement(A,{className:"d-none d-sm-none d-md-none d-lg-block d-xl-block",style:{float:"left",width:"110px"},rotate:!0,zoom:this.state.zoom,countVisible:this.state.countVisible,onChangeCountVisibility:this.handleCountVisibility,onChangeZoom:this.handleZoom,onZoomIn:this.zoomIn,onZoomOut:this.zoomOut,onRotateTable:this.rotateTable}),s.a.createElement(A,{className:"d-block d-sm-block d-md-block d-lg-none d-xl-none",style:{float:"left",width:"100%",maxWidth:600},rotate:!1,zoom:this.state.zoom,countVisible:this.state.countVisible,onChangeCountVisibility:this.handleCountVisibility,onChangeZoom:this.handleZoom,onZoomIn:this.zoomIn,onZoomOut:this.zoomOut,onRotateTable:this.rotateTable}),s.a.createElement("div",{id:"centerPanel",style:{width:"calc(100% - ".concat(this.state.pageWidth>992?110:0,"px)"),overflow:"auto hidden"}},s.a.createElement("div",{style:{height:this.state.baseHeight,width:this.state.baseWidth,marginLeft:this.centerTable(),marginTop:"50px",marginBottom:"50px"}},s.a.createElement("div",{className:"transformContainer",style:{width:"calc(100% / ".concat(this.state.zoom/100,")"),transform:"scale(".concat(this.state.zoom/100,") ")+(this.state.rotate?" scaleX(-1) rotate(90deg)":"")}},s.a.cloneElement(this.props.children,{scaleFactor:this.state.zoom/100,rotate:this.state.rotate,onLoad:this.episodesLoaded,countVisible:this.state.countVisible})))))}},{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateWindowDimensions",value:function(){var e=document.getElementById("centerPanel").getBoundingClientRect().x;this.setState({pageWidth:window.innerWidth,centerPanelX:e})}},{key:"centerTable",value:function(){var e=this.state.pageWidth/2-this.state.baseWidth/2-this.state.centerPanelX;return e>0?e:0}},{key:"episodesLoaded",value:function(){var e=this;this.setState({visible:!0},(function(){return e.getHeightWidth()}))}},{key:"getHeightWidth",value:function(){var e=document.getElementById(this.props.children.props.id).getBoundingClientRect().height,t=document.getElementById(this.props.children.props.id).getBoundingClientRect().width,a=document.getElementById("centerPanel").getBoundingClientRect().x;this.setState({baseWidth:t,baseHeight:e,centerPanelX:a})}},{key:"handleCountVisibility",value:function(e){this.setState({countVisible:e.target.checked})}},{key:"handleZoom",value:function(e,t){var a=this;this.setState({zoom:Math.floor(t)},(function(){return a.getHeightWidth()}))}},{key:"zoomIn",value:function(){var e=this,t=this.state.zoom;t<Z&&this.setState({zoom:t+5},(function(){return e.getHeightWidth()}))}},{key:"zoomOut",value:function(){var e=this,t=this.state.zoom;t>D&&this.setState({zoom:t-5},(function(){return e.getHeightWidth()}))}},{key:"rotateTable",value:function(){var e=this,t=this.state.rotate;this.setState({rotate:!t},(function(){return e.getHeightWidth()}))}}]),a}(n.Component),A=function(e){var t=e.className,a=e.style,n=e.rotate,i=e.zoom,o=(e.countVisible,e.onChangeCountVisibility,e.onChangeZoom),r=e.onZoomIn,l=e.onZoomOut,c=e.onRotateTable;return s.a.createElement("div",{className:t,style:a},s.a.createElement(S.a,{type:"button",onClick:c,style:{color:"black"}},s.a.createElement(V.a,null)),n&&s.a.createElement("br",null),s.a.createElement(S.a,{onClick:n?r:l},n?s.a.createElement(T.a,{style:{color:"black"}}):s.a.createElement(H.a,{style:{color:"black"}})),n&&s.a.createElement("br",null),s.a.createElement("div",{style:{width:n?"":150,height:n?200:"",display:n?"":"inline-block"}},s.a.createElement(F,{valueLabelDisplay:"auto",orientation:n?"vertical":"horizontal",value:i||P,onChange:o,min:D,max:Z,id:"sliderZoom"})),s.a.createElement(S.a,{onClick:n?l:r},n?s.a.createElement(H.a,{style:{color:"black"}}):s.a.createElement(T.a,{style:{color:"black"}})))},F=Object(z.a)({root:{color:"#52af77",padding:"6px 0"},thumb:{height:24,width:24,backgroundColor:"#fff",border:"2px solid currentColor",marginTop:-11,marginLeft:"-11px !important",transform:"rotate(90deg) !important","&:focus, &:hover, &$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"auto"},track:{height:2,borderRadius:4},rail:{height:2,borderRadius:4}})(L.a),G=M,X=function e(t,a,n,s,i,o,r,l){Object(u.a)(this,e),this.title=t,this.link=a,this.imageLink=n,this.rating=s,this.ratingCount=i,this.year=o,this.number=r,this.season=l};X.prototype.toString=function(){return"S".concat(this.season,", Ep").concat(this.number,", Date ").concat(this.airdate," ").concat(this.rating," : '").concat(this.title,"'")};var q=X;function K(e,t){return U.apply(this,arguments)}function U(){return(U=Object(c.a)(l.a.mark((function e(t,a){var n,s,i,o,r,c,u,h;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n="https://www.omdbapi.com/?apikey="+v.a.omdbApiKey+"&i="+t+"&Season=",console.log("totalSeasons",a),s={},i=1;case 4:if(!(i<=a)){e.next=18;break}return o=n+i,e.next=8,fetch(o);case 8:return r=e.sent,console.log("urlSeason",o),e.next=12,r.json();case 12:if(c=e.sent,console.log("data",c),"True"===c.Response)for(u=0;u<c.Episodes.length;u++)h=new q(c.Episodes[u].Title,"https://www.imdb.com/title/"+c.Episodes[u].imdbID,"",c.Episodes[u].imdbRating,0,c.Episodes[u].Released.substring(0,4),c.Episodes[u].Episode,i),s[h.season]?s[h.season].push(h):s[h.season]=[h];case 15:i++,e.next=4;break;case 18:return e.abrupt("return",s);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var J=function e(t,a,n,s,i,o){Object(u.a)(this,e),this.idImdb=t,this.genres=a,this.plot=n,this.rate=s,this.rateCount=i,this.totalSeasons=o};function $(e){return Y.apply(this,arguments)}function Y(){return(Y=Object(c.a)(l.a.mark((function e(t){var a,n,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="https://www.omdbapi.com/?apikey="+v.a.omdbApiKey+"&i="+t,e.next=3,fetch(a);case 3:return n=e.sent,e.next=6,n.json();case 6:return s=e.sent,i=new J(s.Title,s.Genre,s.Plot,s.imdbRating,s.imdbVotes,s.totalSeasons),console.log("series",i),e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var _=a(94),Q=a(88),ee=a(89),te=a(90),ae=a(92);function ne(e){return s.a.createElement(_.a,null,s.a.createElement(Q.a,{classes:{media:"seriesCover"},component:"img",src:e.series&&(e.series.imageLink||w.a)}),s.a.createElement(ee.a,{className:"card-title"},s.a.createElement(te.a,{variant:"body2",align:"left",display:"block"},s.a.createElement("b",null,"Genres: "),e.seriesInfo?"".concat(e.seriesInfo.genres):""),s.a.createElement(te.a,{variant:"body2",align:"left",display:"block"},s.a.createElement("b",null,"Rate: "),e.seriesInfo?"".concat(e.seriesInfo.rate,"/10 (").concat(e.seriesInfo.rateCount," votes)"):""),s.a.createElement(te.a,{variant:"body2",align:"left",display:"block"},s.a.createElement("b",null,"Plot: "),e.seriesInfo?"".concat(e.seriesInfo.plot):"")))}var se=function(e){Object(m.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={series:null,seriesInfo:null,episodesList:[],loading:!1,collapse:!1,pnlH:null},n.handleSearch=n.handleSearch.bind(Object(d.a)(n)),n.clickCollapse=n.clickCollapse.bind(Object(d.a)(n)),n.handleResize=n.handleResize.bind(Object(d.a)(n)),n}return Object(h.a)(a,[{key:"handleSearch",value:function(){var e=Object(c.a)(l.a.mark((function e(t){var a,n,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({loading:!0}),e.next=3,$(t.idImdb);case 3:return a=e.sent,n=K(t.idImdb,a.totalSeasons),e.next=7,n;case 7:s=e.sent,this.setState({episodesList:s,series:t,seriesInfo:a,loading:!1});case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getImage",value:function(){var e=this.state.series,t="";e&&(t=e.imageLink,console.log("image",t));return t}},{key:"clickCollapse",value:function(e){this.setState({collapse:!this.state.collapse})}},{key:"handleResize",value:function(e){this.setState({pnlH:e})}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(N,{loading:this.state.loading}),s.a.createElement("div",{className:"row",style:{margin:0}},s.a.createElement("div",{className:"col-md-4"}),s.a.createElement("div",{className:"col-md-4"},s.a.createElement(x,{onSearch:this.handleSearch,style:{marginTop:20}}))),s.a.createElement("div",{className:"row",style:{height:this.state.pnlH?this.state.pnlH:"",margin:0}},s.a.createElement("div",{className:"col-md-2"},this.state.series&&s.a.createElement("button",{className:"btn btn-primary d-sm-none",style:{margin:20},onClick:this.clickCollapse},this.state.collapse?"Expand":"Collapse"),s.a.createElement(ae.a,{in:!this.state.collapse},this.state.series&&s.a.createElement(ne,{series:this.state.series,seriesInfo:this.state.seriesInfo}))),s.a.createElement(G,{onResize:this.handleResize},s.a.createElement(I,{id:"pnlEpisodes",episodesList:this.state.episodesList}))))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(67);o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.d4749d09.chunk.js.map