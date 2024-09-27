(function($) {
		    	//2010-11-26
		    	$.fn.extend({
			        //Tab插件名称
			        XQHTab: function(options) {
			            //默认值
			            var defaults = {
			                tabSelected: "tab_selected",
			                tabWidth: "100%",
			                autoHeight: "true"
			            };

			            var options = $.extend(defaults, options);

			            $(this).css("width", options.tabWidth);

			            //选项卡 this指通过当前选择器获取的JQuery对象
			            var tab = $(".tab_menu div", this);
			            //选项内容
			            var tabContent = $(".tab_box > div", this);

			            if (options.autoHeight != "true") {
			                tabContent.css("height", options.autoHeight);
			            }

			            //单击选项卡
			            tab.mouseover(function() {
			                $(this).addClass(options.tabSelected).siblings().removeClass(options.tabSelected);
			                var curIndex = tab.index(this);
			                tabContent.eq(curIndex).show().siblings().hide();
			            });

			            //return this使JQuery方法可链
			            return this;
			        }
		    		});
			})(jQuery);

			$(function() {/*TAB全局都可用*/
				$(".container .tab").XQHTab();
		    });

		    $(function() {/*体育台的列表li鼠标悬浮效果*/
				$(".sideSport .tab_box .txt").each(function(index, el) {
					$(el).mouseover(function(){
						$(".sideSport .tab_box .bg").hide()
						$(".sideSport .tab_box .bg").eq(index).show()
					}).mouseout(function(event) {
						$(".sideSport .tab_box .bg").hide()
						
					});
				});
		    });

		    $(function(){//体育直播滚动条hover控制开关
		    	$(".sideSport .tab_box>div")
		    	.mouseover(function(event) {
			    		$(this).css({
			    			overflowY: 'auto'
			    		});
		    	})
		    	.mouseout(function(event) {
			    		$(this).css({
			    			overflowY: 'hidden'
			    		});
		    		})
		    });

		    $(function(){/*第二个插件*/
				jQuery(".Mod2").slide({
					titCell:".menu ul",
					mainCell:".box>ul",
					autoPage:"<li><a></a></li>",
					effect:"left",
					autoPlay:"true",
					scroll:1,
					vis:1,
					easing:"swing",
					dellayTime:500,
					pnLoop:true,
					trigger:"mouseover",
					mouseOverStop:true,
					prevCell:".prevCell",
					nextCell:".nextCell"
				});
			});
			$(function(){/*滚动图1*/
				jQuery(".cover").slide({
					titCell:".titCell ul",
					mainCell:".mod5box ul",
					autoPage:"<li><a></a></li>",
					effect:"left",
					autoPlay:"true",
					scroll:5,
					vis:5,
					easing:"swing",
					dellayTime:2000,
					pnLoop:true,
					trigger:"mouseover",
					mouseOverStop:true,
					prevCell:".prePic",
					nextCell:".nextPic"
				});
			});
			$(function(){/*滚动图2*/
				jQuery(".sideHistory").slide({
					titCell:false,
					mainCell:".bd ul",
					autoPage:false,
					effect:"left",
					autoPlay:"true",
					scroll:1,
					vis:1,
					easing:"swing",
					dellayTime:500,
					pnLoop:true,
					trigger:"mouseover",
					mouseOverStop:true,
					prevCell:".prePic",
					nextCell:".nextPic"
				});
			});