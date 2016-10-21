;(function () {
  'use strict';
  
  /* -----------------------------------------------*/
  // JS init
  /* -----------------------------------------------*/
  // 初期設定
  document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;
    body.className = body.className.replace(/no-js/, 'js');
  }, false);
  
  /* -----------------------------------------------*/
  // showRandom
  /* -----------------------------------------------*/
  // ランダム表示
  var showRandom = function() {
    var hero    = document.querySelector('.js-random-hero');
    var project = document.querySelector('.js-random-project');
    
    if(hero || project) {
      
      // 処理の完了
      var setAnimation = function(key) {
        key.className = key.className + ' is-done';
      };
      
      // ヒーローエリア
      var setHeroImages = function(obj) {
        var arr   = obj.hero;
        var image = hero.querySelector('.js-random-hero-image');
        
        // 乱数
        var rand = Math.floor(Math.random() * arr.length);
        
        // 値の設定
        image.setAttribute('src', arr[rand]);
        
        // 画像のクローンを生成して、読み込みが完了したら表示する
        var cln = image.cloneNode(true);
        
        cln.addEventListener('load', function() {
          setAnimation(hero);
        }, false);
      };
      
      // プロジェクト
      var setProjectItems = function(obj) {
        var arr   = obj.project;
        var hdg   = project.querySelector('.js-random-project-hdg');
        var post  = project.querySelector('.js-random-project-post');
        var image = project.querySelector('.js-random-project-image');
        var desc  = project.querySelector('.js-random-project-desc');
        var name  = project.querySelector('.js-random-project-name');
        
        // 乱数
        var rand = Math.floor(Math.random() * arr.length);
        
        // 値の設定
        hdg.innerText  = arr[rand].hdg;
        post.innerText = arr[rand].post;
        desc.innerText = arr[rand].desc;
        name.innerText = arr[rand].name;
        hdg.setAttribute('href', arr[rand].link);
        image.setAttribute('src', arr[rand].image);
        image.setAttribute('alt', arr[rand].name);
        
        // 画像のクローンを生成して、読み込みが完了したら表示する
        var cln = image.cloneNode(true);
        
        cln.addEventListener('load', function() {
          setAnimation(project);
        }, false);
      };
      
      // JSON ファイルの読み込み
      if(!window.XMLHttpRequest) {
        // XMLHttpRequest 非対応の処理
        if(hero) {
          setAnimation(hero);
        }
        if(project) {
          setAnimation(project);
        }
      }
      else {
        // XMLHttpRequest
        var xhr = new XMLHttpRequest();
        var url = './home/json/home.json';
        
        // エラー処理
        xhr.onerror = function() {
          if(hero) {
            setAnimation(hero);
          }
          if(project) {
            setAnimation(project);
          }
        };
        
        // リクエスト
        xhr.onreadystatechange = function() {
          if(xhr.readyState === 4 && xhr.status === 200) {
            var obj = JSON.parse(xhr.responseText);
            
            if(hero) {
              setHeroImages(obj);
            }
            
            if(project) {
              setProjectItems(obj);
            }
          }
        };
        
        xhr.open('GET', url, true);
        xhr.send();
      }
    }
  };
  
  //日本語TOP　文字表示
  var doTopIntroAnimation = function(){
    var hero = document.querySelector('.js-random-hero');
    if(hero) {
       setTimeout(function(){
         hero.classList.add("is-displayed");
       },800);
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    var _lang = document.getElementsByTagName("html")[0].getAttribute("lang");
    if(_lang === "en") showRandom();
    else doTopIntroAnimation();
  }, false);
  
  /* -----------------------------------------------*/
  // enlargeLinks
  /* -----------------------------------------------*/
  // リンク領域の拡大
  var enlargeLinks = function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      location.href = this.querySelector('a').getAttribute('href');
    }, false);
  };
  var enlargeLinksInit = function() {
    var link = document.querySelectorAll('.js-enlarge-link');
    var len  = link.length;
    
    if(len < 1) {
      return false;
    }
    
    for(var i = 0; i < len; i++) {
      enlargeLinks(link[i]);
    }
  };
  document.addEventListener('DOMContentLoaded', function() {
    enlargeLinksInit();
  }, false);
  
  /* -----------------------------------------------*/
  // animCharts
  /* -----------------------------------------------*/
  // チャートのアニメーション
  var animCharts = function(chart, i) {
    var delay = 200 * i;
    
    setTimeout(function() {
      chart.className = chart.className + ' is-show';
    }, delay);
  };
  var animChartsInits = function() {
    var start = document.getElementById('js-chart-start');
    if(!start) { return false; }
    
    var winHeight = window.innerHeight;
    var scrollTop = window.pageYOffset;
    var targetY   = start.getBoundingClientRect().top;
    var flg       = false;
    
    // アニメーションの実行
    var runAnimation = function() {
      var chart = document.querySelectorAll('.js-chart-item');
      var len   = chart.length;
      
      for(var i = 0; i < len; i++) {
        animCharts(chart[i], i);
      }
    };
    
    // 初期設定
    if(targetY < (scrollTop + winHeight)) {
      flg = true;
      runAnimation();
    }
    
    // スクロールイベント
    window.addEventListener('scroll', function() {
      if(!flg) {
        winHeight = window.innerHeight;
        scrollTop = window.pageYOffset;
        
        if(targetY < (scrollTop + winHeight)) {
          flg = true;
          runAnimation();
        }
      }
    }, false);
    
    // リサイズイベント
    window.addEventListener('resize', function() {
      if(!flg) {
        winHeight = window.innerHeight;
        scrollTop = window.pageYOffset;
        
        if(targetY < (scrollTop + winHeight)) {
          flg = true;
          runAnimation();
        }
      }
    }, false);
  };
  document.addEventListener('DOMContentLoaded', function() {
    animChartsInits();
  }, false);
  
  /* -----------------------------------------------*/
  // respondChart
  /* -----------------------------------------------*/
  // チャートのレイアウト調整
  var respondChart = function(chart) {
    var bodyWidth    = document.body.clientWidth;
    var MAX_WIDTH   = 1350;
    var MIN_WIDTH   = 1000;
    var marginRight = -175;
    var marginLeft  = -430;
    var gap         = 0;
    
    if(bodyWidth < MAX_WIDTH && bodyWidth >= MIN_WIDTH) {
      gap = (MAX_WIDTH - bodyWidth) / 2 + 2;
      
      chart.style.marginRight = marginRight + gap + 'px';
      chart.style.marginLeft  = marginLeft  + gap + 'px';
    }
    else {
      chart.style.marginRight = marginRight + 'px';
      chart.style.marginLeft  = marginLeft + 'px';
    }
  };
  var respondChartInit = function() {
    var chart = document.getElementById('js-chart-respond');
    
    if(chart) {
      respondChart(chart);
      window.addEventListener('resize', function() {
        respondChart(chart);
      }, false);
    }
  };
  document.addEventListener('DOMContentLoaded', function() {
    respondChartInit();
  }, false);
  
  /* -----------------------------------------------*/
  // fixHeight
  /* -----------------------------------------------*/
  // 要素の高さ揃え
  var fixHeight = function() {
    var item       = document.getElementsByClassName('js-fix-height');
    var len        = item.length;
    var oddHeight  = 0;
    var evenHeight = 0;
    
    if(len < 1) {
      return false;
    }
    
    for(var i = 0; i < len; i++) {
      if((i % 2) === 0) {
        evenHeight = item[i].clientHeight;
        
        if((i + 1) < len) {
          oddHeight  = item[i + 1].clientHeight;
        }
        
        if(evenHeight < oddHeight) {
          item[i].style.minHeight = oddHeight + 'px';
        }
        else if(oddHeight < evenHeight && (i + 1) < len) {
          item[i + 1].style.minHeight = evenHeight + 'px';
        }
      }
    }
  };
  window.onload = function() {
    fixHeight();
  };
  
}).call(this);