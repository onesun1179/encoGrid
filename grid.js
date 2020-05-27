
(function(){
	
	// enco.util을 그리드 내 공통으로 사용
	if(!Enco["util"] 
	|| $.isEmptyObject(Enco)) 
		throw "enco is Empty!";
	 
	var u = Enco.util;
	
	Enco["Grid"] = function(_element, _bindingConfig) {
		if(!_element) throw "[_element] is required";
		
		this.$ = {
					 "pan" : undefined,					 	          
	     		  "pan_hd" : undefined,
	     		"pan_titl" : undefined,
	     "pan_ctl_btn_grp" : undefined,
	     	       "tb_wp" : undefined,
	     	    "tb_hd_wp" : undefined,
	     	    "tb_bd_wp" : undefined,
	     	                          
	     	    "sd_hd_wp" : undefined,
	     	    "sd_hd_tb" : undefined,
	     	                          
	     	    "sd_tp_wp" : undefined,
	     	    "sd_tp_tb" : undefined,
	     	                          
	     	    "sd_bd_tb" : undefined,
	     	    "sd_bd_wp" : undefined,
	     	                
	     	    "lf_hd_wp" : undefined,      
	     	    "lf_hd_tb" : undefined,
	     	                 
	     	    "lf_tp_wp" : undefined,
	     	    "lf_tp_tb" : undefined,
	     	                 
	     	    "lf_bd_wp" : undefined,
	     	    "lf_bd_tb" : undefined,
	     	                 
	     	    "bd_hd_wp" : undefined,
	     	    "bd_hd_tb" : undefined,
	     	                 
	     	    "bd_tp_wp" : undefined,
	     	    "bd_tp_tb" : undefined,
	     	                 
	     	    "bd_bd_wp" : undefined,
	     	    "bd_bd_tb" : undefined,
	     	                 
	     	    "bd_ft_wp" : undefined,
	    	    "bd_ft_tb" : undefined,
	    	                 
	    	    "tb_sd_br" : undefined,
	    	    "tb_bt_br" : undefined,
		};
		this.element = $(_element)
		
		// 가공된 컬럼들
		this.columns = {
			all : [],
			left : [],
			body : [],
			
			haveKey : [],
			leftHaveKey : [],
			bodyHaveKey : [],
		},
		this.list = []
		this.gridStateInfos = {
			panel : {
				height : 0,
				width : 0,
				realDataWidth : 0,
				tableSumHeight : 0
			},
			
			head : {
				cellHeight : 0,
				cellWidth : 0,
				height : 0,
				maxRowLv : 0
			},
			body : {
				oneLineRow : 0,
				height : 0,
				cellHeight : 0,
				cellWidth : 0,
				realDataHeight : 0
			},
			side : {
				lineSortCellWidth : 0,
				selectCellWidth : 0
			}
		}
		this.blindState = false
		this.dataGroup = {
		      /*******************************************************************/
		      /*sd-hd-tb*lf-hd-tb*	bd-hd-tb									 */
		      /*******************************************************************/
		      /*sd-tp-tb*lf-tp-tb*	bd-tp-tb									 */
		      /*		*	     *												 */
		      /*******************************************************************/
		      /*sd-bd-tb*lf-bd-tb*	bd-bd-tb									 */
		      /*		*	     *												 */
		      /*		*	     *												 */
		      /*		*	     *												 */
		      /*******************************************************************/
		      /*       	            bd-ft-tb									 */
		      /*******************************************************************/
		  	"map" : {
         	     "pan" : "data-enco_map=\"pan\"",					 	          
     		  "pan_hd" : "data-enco_map=\"pan_hd\"",
     		"pan_titl" : "data-enco_map=\"pan_titl\"",
     "pan_ctl_btn_grp" : "data-enco_map=\"pan_ctl_btn_grp\"",
     	       "tb_wp" : "data-enco_map=\"tb_wp\"",
     	    "tb_hd_wp" : "data-enco_map=\"tb_hd_wp\"",
     	    "tb_bd_wp" : "data-enco_map=\"tb_bd_wp\"",
     	                           
     	    "sd_hd_wp" : "data-enco_map=\"sd_hd_wp\"",
     	    "sd_hd_tb" : "data-enco_map=\"sd_hd_tb\"",
     	                           
     	    "sd_tp_wp" : "data-enco_map=\"sd_tp_wp\"",
     	    "sd_tp_tb" : "data-enco_map=\"sd_tp_tb\"",
     	                           
     	    "sd_bd_tb" : "data-enco_map=\"sd_bd_tb\"",
     	    "sd_bd_wp" : "data-enco_map=\"sd_bd_wp\"",
     	                           
     	    "lf_hd_wp" : "data-enco_map=\"lf_hd_wp\"",              
     	    "lf_hd_tb" : "data-enco_map=\"lf_hd_tb\"",
     	                           
     	    "lf_tp_wp" : "data-enco_map=\"lf_tp_wp\"",
     	    "lf_tp_tb" : "data-enco_map=\"lf_tp_tb\"",
     	                           
     	    "lf_bd_wp" : "data-enco_map=\"lf_bd_wp\"",
     	    "lf_bd_tb" : "data-enco_map=\"lf_bd_tb\"",
     	                           
     	    "bd_hd_wp" : "data-enco_map=\"bd_hd_wp\"",
     	    "bd_hd_tb" : "data-enco_map=\"bd_hd_tb\"",
     	                           
     	    "bd_tp_wp" : "data-enco_map=\"bd_tp_wp\"",
     	    "bd_tp_tb" : "data-enco_map=\"bd_tp_tb\"",
     	                           
     	    "bd_bd_wp" : "data-enco_map=\"bd_bd_wp\"",
     	    "bd_bd_tb" : "data-enco_map=\"bd_bd_tb\"",
     	                           
     	    "bd_ft_wp" : "data-enco_map=\"bd_ft_wp\"",
    	    "bd_ft_tb" : "data-enco_map=\"bd_ft_tb\"",
    	                           
    	    "tb_sd_br" : "data-enco_map=\"tb_sd_br\"",
    	    "tb_bt_br" : "data-enco_map=\"tb_bt_br\"",
			},
		
		}
		this.classes = {
				   "pan" : "enco_grid_pan",					 	          
				"pan_hd" : "enco_grid_pan_hd",
			  "pan_titl" : "enco_grid_pan_titl",
	   "pan_ctl_btn_grp" : "enco_grid_pan_ctl_btn_grp",
		         "tb_wp" : "enco_grid_tb_wp",
		      "tb_hd_wp" : "enco_grid_tb_hd_wp",
		      "tb_bd_wp" : "enco_grid_tb_bd_wp",
		      
		      "sd_hd_wp" : "enco_grid_sd_hd_wp",
		      "sd_hd_tb" : "enco_grid_sd_hd_tb",
		      
		      "sd_tp_wp" : "enco_grid_sd_tp_wp",
		      "sd_tp_tb" : "enco_grid_sd_tp_tb",
		      
		      "sd_bd_wp" : "enco_grid_sd_bd_wp",
		      "sd_bd_tb" : "enco_grid_sd_bd_tb",
		      
		      "lf_hd_wp" : "enco_grid_lf_hd_wp",
		      "lf_hd_tb" : "enco_grid_lf_hd_tb",
		      
		      "lf_tp_wp" : "enco_grid_lf_tp_wp",
		      "lf_tp_tb" : "enco_grid_lf_tp_tb",
		      
		      "lf_bd_wp" : "enco_grid_lf_bd_wp",
		      "lf_bd_tb" : "enco_grid_lf_bd_tb",
		           
		      "bd_hd_wp" : "enco_grid_bd_hd_wp",
		      "bd_hd_tb" : "enco_grid_bd_hd_tb",
		      
		      "bd_tp_wp" : "enco_grid_bd_tp_wp",
		      "bd_tp_tb" : "enco_grid_bd_tp_tb",
		      
		      "bd_bd_wp" : "enco_grid_bd_bd_wp",
		      "bd_bd_tb" : "enco_grid_bd_bd_tb",
		           
		      "bd_ft_wp" : "enco_grid_bd_ft_wp",
		      "bd_ft_tb" : "enco_grid_bd_ft_tb",
		      
		      "tb_sd_br" : "enco_grid_tb_sd_br",
		      "tb_bt_br" : "enco_grid_tb_bt_br",
	}
		this.config = {
			classes : {
				 "pan_titl" : "enco_ui_grid_panel_title",
			},
			panel : {
				title  : "검색 결과",
				titleHeight : 37,
				height : "100%",
				width  : "100%",
				controlBtn : {
					blind    : true,
					onBtnblindClick : null,
					minimize : true,
					onBtnMinimizeClick : null,
					popUp    : true,
					onBtnPopUpClick : null,
				}
			},
			
			cellWidth : 50,
			
			header : {
				display : true,
				cellHeight  : 30,
				headAlign : "center",
				columns : []
			},
			body : {
				side : {
					select : {
						show   : true,
						cellWidth : 20,
						multiple    : false
					},
					lineSort : {
						show : true,
						cellWidth : 20,
						number : false,
						korean : false,
						english : false,
					}
				},
				display 		  : true,
				cellHeight 	      : 30,
				frozenColumnIndex : -1,
			    frozenRowIndex    : -1,
			    showLineNumber    : false,
			    showRowSelector   : false,
			    multipleSelect    : true,
			    virtualScrollY    : true,
			    virtualScrollX    : true,
			},
		}
		
		/*    private 
         * @ 메소드 명  	    : (SRCH) _create 
         * @ 설명				: 최초 그리드 생성
         * @ save prototype : 
         * @ parameter  	: undefined
         * @ return  		: undefined
         */
		var _create = function _create() {
		    
		    _saveColumn.call(this, this.config.header.columns)
		    
		    console.log(this)
			
			var cls = this.classes,
				 dg = this.dataGroup,
		sideColumns = this._getSideColumns.call(this);
			// 자식 요소 모두 삭제
			this.element.empty()
						.removeAttr("class")
						.removeAttr("style")						
						.height(this._convertToPx(window.innerHeight, this.config.panel.height))
						.width(this._convertToPx(window.innerWidth, this.config.panel.width))
				    	.addClass(cls.pan)
				    	.append(
				    			  "<div class=\""+ cls.pan_hd + "\" "+ " " + dg.map.pan_hd + ">"
				    		     	+ "<div class=\""+ cls.pan_titl + "\" "+ " " + dg.map.pan_titl + ">"
				    		     		+ "<span> " + this.config.panel.title +"</span>"
				    		     	+ "</div>"
				    		     	+ "<div class=\"btn-group "+ cls.pan_ctl_btn_grp + "\" "+ " role='group' " + dg.map.pan_ctl_btn_grp + ">"
				    		     	+ "</div>"
				    		     + "</div>"
				    		     
				    		     + "<div class=\""+ cls.tb_wp + "\" "+  dg.map.tb_wp + ">"
				    		     
				    		     	+ "<div class=\""+ cls.tb_hd_wp + "\" "+ " " + dg.map.tb_hd_wp + ">"
				    		     	
				    		     		// Side Header Zone
				    		     		+"<div class=\""+ cls.sd_hd_tb + "\" "+ " " + dg.map.sd_hd_wp+">"
				    		     			+ "<table class=\""+ cls.sd_hd_tb + "\" "+ " " + dg.map.sd_hd_tb+">"
				    		     			+ "</table>"
				    		     		+ "</div>"
				    		     		
				    		     		// Left Header Zone
				    		     		+ "<div class=\""+ cls.lf_hd_wp + "\" "+ " " + dg.map.lf_hd_wp+">"
				    		     			+ "<table class=\""+ cls.lf_hd_tb + "\" "+ " " + dg.map.lf_hd_tb+">"
				    		     			+ "</table>"
				    		     		+ "</div>"
				    		     		
				    		     		// Body Header Zone
				    		     		+ "<div class=\""+ cls.bd_hd_wp + "\" "+ " " + dg.map.bd_hd_wp+">"
				    		     			+ "<table class=\""+ cls.bd_hd_tb + "\" "+ " " + dg.map.bd_hd_tb +">"
				    		     			+ "</table>"
				    		     		+ "</div>"
				    		     		
				    		     	+ "</div>"
				    		     	
				    		     	+ "<div class=\""+ cls.tb_bd_wp + "\" "+ " " + dg.map.tb_bd_wp +">"
				    		     		// Side Body Zone
				    		     		+ "<div class=\""+ cls.sd_tp_wp + "\" "+ " " + dg.map.sd_tp_wp + ">"
				    		     			+ "<table class=\""+ cls.sd_tp_tb + "\" "+ " " + dg.map.sd_tp_tb +"></table>"
				    		     		+ "</div>"
				    		     		
				    		     		+ "<div class=\""+ cls.sd_bd_wp + "\" "+ " " + dg.map.sd_bd_wp + ">"
				    		     			+ "<table class=\""+ cls.sd_bd_tb + "\" "+ " " + dg.map.sd_bd_tb +"></table>"
				    		     		+ "</div>"
				    		     		
				    		     		// Left Body Zone
				    		     		+ "<div class=\""+ cls.lf_tp_wp + "\" "+ " " + dg.map.lf_tp_wp + ">"
					    		     		+ "<table class=\""+ cls.lf_tp_tb + "\" "+ " " + dg.map.lf_tp_tb +">"
					    		     		+ "</table>"
					    		     	+ "</div>"
					    		     	
					    		     	+ "<div class=\""+ cls.lf_bd_wp + "\" "+ " " + dg.map.lf_bd_wp + ">"
				    		     			+ "<table class=\""+ cls.lf_bd_tb + "\" "+ " " + dg.map.lf_bd_tb +">"
					    		     		+ "</table>"
					    		     	+ "</div>"
				    		     	
					    		     	// Body Body Zone
					    		     	+ "<div class=\""+ cls.bd_tp_wp + "\" "+ " " + dg.map.bd_tp_wp + ">"
					    		     		+ "<table class=\""+ cls.bd_tp_tb + "\" "+ " " + dg.map.bd_tp_tb +">"
					    		     		+ "</table>"
					    		     	+ "</div>"
					    		     	
					    		     	+ "<div class=\""+ cls.bd_bd_wp + "\" "+ " " + dg.map.bd_bd_wp + ">"
					    		     		+ "<table class=\""+ cls.bd_bd_tb + "\" "+ " " + dg.map.bd_bd_tb +">"
					    		     		+ "</table>"
					    		     	+ "</div>"
				    		     		
				    		     	                                    
				    		     		+ "<table class=\""+ cls.bd_ft_tb + "\"></table>"
				    		     		
				    		     		
				    		     	+ "</div>"
				    		     	+ "<div class=\""+ cls.tb_sd_br + "\" "+ dg.map.tb_sd_br + ">"
				    		     		+ "<div></div>"
				    		     	+ "</div>"
				    		     	+ "<div class=\""+ cls.tb_bt_br + "\" "+ dg.map.tb_bt_br + "></div>"
				    		     + "</div>"
				    	);
			
			_saveRefAddress.call(this);
			
			_setWindowResizeControl.call(this);
			
			this.setControlButton()
		}
		
		
		/* 
         * @ 메소드 명  	    : (SRCH) _setWindowResizeControl
         * @ 설명				: 화면 크기 변경 시, 그리드 최초 생성 시 발현
         * @ save prototype : 
         * @ parameter  	: 
         * @ return  		:  
         */
		var _setWindowResizeControl = function _setWindowResizeControl() {
			console.log(this)
			function _resizeCallBack() {
				console.log(this)
			}
			$(window).on("resize", _resizeCallBack)
			// 최초 실행
			_resizeCallBack()
		}
		
		/* private
         * @ 메소드 명          : (SRCH) _saveList
         * @ 설명             : 객체 내 리스트 저장
         * @ save prototype : encoGrid.list
         * @ parameter      : {array} list
         * @ return         : undefined 
         * @ example        : 
         *      
         *      encoGrid.setList([
         *          {key1 : 1, key1 : 2},
         *          {key1 : 1, key1 : 2},
         *          {key1 : 1, key1 : 2}
         *      ])
         */
        var _saveList = function _saveList(list) {
            
            // set list
            var frozenRowIndex = this.config.body.frozenRowIndex,
                     leftElStr = "",
                     bodyElStr = ""
               leftHaveKeyCols = this.columns.leftHaveKey,
               bodyHaveKeyCols = this.columns.bodyHaveKey,
                       mapList = [],
                realDataHeight = 0,
                     cellWidth = this.gridStateInfos.body.cellWidth,
                    cellHeight = this.gridStateInfos.body.cellHeight,
                    oneLineRow = this.gridStateInfos.body.oneLineRow;
            
                    
            console.table(leftHaveKeyCols)
            console.table(bodyHaveKeyCols)
            
                 
            list.forEach(function(o, i) {               
                var tempLv = -1,
               tempTrCount = 0,
                       map = {};
                
//              leftElStr += (i==0 ? "<tr>" : "</tr><tr>")
                
                leftHaveKeyCols.forEach(function(oo, ii) {
                    if(tempLv != oo["lv"]) {
                        tempTrCount++;
                        realDataHeight += cellHeight;
                        leftElStr += tempLv == -1 ? "<tr height='"+cellHeight+"px'>" : "</tr><tr height='"+cellHeight+"px'>"
                        tempLv = oo["lv"]
                        
                    }
                    
                    map[oo.rowMap] = map[oo.rowMap]||{};
                    
                    if(o.hasOwnProperty(oo.key)) {
                        map[oo.rowMap][oo.colMap] = o[oo.key]
                        leftElStr += "<td colspan=\""+oo.colspan+"\" rowspan=\""+oo.rowspan+"\" data-col_index=\""+oo.colMap+"\" data-row_index=\""+oo.rowMap+"\">"+o[oo.key]+"</td>"
//                      leftElStr += "<td colspan=\""+oo.colspan+"\" rowspan=\""+oo.rowspan+"\" data-col_index=\""+oo.colMap+"\" data-row_index=\""+oo.rowMap+"\">"+oo.rowMap + ',' + oo.colMap + ',' + oo.rowspan + ',' + oo.colspan +"</td>"
                    } else {
                        map[oo.rowMap][oo.colMap] = undefined
                        leftElStr += "<td colspan=\""+oo.colspan+"\" rowspan=\""+oo.rowspan+"\" data-col_index=\""+oo.colMap+"\" data-row_index=\""+oo.rowMap+"\"></td>"
                    }
                })
                
                if(tempLv > -1) {
                    leftElStr += "</tr>";
                    
                    // Insert Empty Tr
                    for(i=0, max=oneLineRow-tempTrCount; i<max; i++) {
                        leftElStr += "<tr height='"+cellHeight+"px'></>"
                    }
                    
                    tempLv = -1;
                }
                
                
                    
                bodyElStr += (i==0 ? "<tr>" : "</tr><tr>")
                bodyHaveKeyCols.forEach(function(oo, ii) {
                    map[oo.rowMap] = map[oo.rowMap]||{};
                    
                    
                    bodyElStr += "<td colspan=\""+oo.colspan+"\" rowspan=\""+oo.rowspan+"\" data-col_index=\""+oo.colMap+"\" data-row_index=\""+oo.rowMap+"\">"
                    
                    if(o.hasOwnProperty(oo.key)) {
                        map[oo.rowMap][oo.colMap] = o[oo.key]
                        bodyElStr += o[oo.key] + "</td>"
                    } else {
                        map[oo.rowMap][oo.colMap] = undefined
                        bodyElStr += "</td>"
                    }
                })
                mapList.push(map)
            })
            
            // GRID Ref!!
            this.gridStateInfos.body.realDataHeight = realDataHeight;
            
            console.log(leftElStr)
            
            this.element.find("[" + this.dataGroup.map.lf_bd_tb + "]:first")
                .append(leftElStr)
            this.element.find("[" + this.dataGroup.map.bd_bd_tb + "]:first")
//              .append(bodyElStr)
            
                
            
        }
        
        /*    private
         * @ 메소드 명          : (SRCH) _serRefEl 
         * @ 설명             : 그리드 객체 내 원활한 객체 참조를 위해 참조 변수 저장 
         * @ save prototype : encoGrid.$.*
         * @ parameter      : undefined
         * @ return         : undefined
         * @ example        : 
         */
        var _saveRefAddress = function _saveRefAddress() {
            
            /* Save Object */
            this.$["pan"]          = this.element;
            this.$.pan_hd          = this.element.find("[data-enco_map = \"pan_hd\"]:first");
            this.$.pan_titl        = this.element.find("[data-enco_map = \"pan_titl\"]:first");
            this.$.pan_ctl_btn_grp = this.element.find("[data-enco_map = \"pan_ctl_btn_grp\"]:first");
            this.$.tb_wp           = this.element.find("[data-enco_map = \"tb_wp\"]:first");
            this.$.tb_hd_wp        = this.element.find("[data-enco_map = \"tb_hd_wp\"]:first");
            this.$.tb_bd_wp        = this.element.find("[data-enco_map = \"tb_bd_wp\"]:first");
            this.$.sd_hd_wp        = this.element.find("[data-enco_map = \"sd_hd_wp\"]:first");
            this.$.sd_hd_tb        = this.element.find("[data-enco_map = \"sd_hd_tb\"]:first");
            this.$.sd_tp_wp        = this.element.find("[data-enco_map = \"sd_tp_wp\"]:first");
            this.$.sd_tp_tb        = this.element.find("[data-enco_map = \"sd_tp_tb\"]:first");
            this.$.sd_bd_tb        = this.element.find("[data-enco_map = \"sd_bd_tb\"]:first");
            this.$.sd_bd_wp        = this.element.find("[data-enco_map = \"sd_bd_wp\"]:first");
            this.$.lf_hd_wp        = this.element.find("[data-enco_map = \"lf_hd_wp\"]:first");
            this.$.lf_hd_tb        = this.element.find("[data-enco_map = \"lf_hd_tb\"]:first");
            this.$.lf_tp_wp        = this.element.find("[data-enco_map = \"lf_tp_wp\"]:first");
            this.$.lf_tp_tb        = this.element.find("[data-enco_map = \"lf_tp_tb\"]:first");
            this.$.lf_bd_wp        = this.element.find("[data-enco_map = \"lf_bd_wp\"]:first");
            this.$.lf_bd_tb        = this.element.find("[data-enco_map = \"lf_bd_tb\"]:first");
            this.$.bd_hd_wp        = this.element.find("[data-enco_map = \"bd_hd_wp\"]:first");
            this.$.bd_hd_tb        = this.element.find("[data-enco_map = \"bd_hd_tb\"]:first");
            this.$.bd_tp_wp        = this.element.find("[data-enco_map = \"bd_tp_wp\"]:first");
            this.$.bd_tp_tb        = this.element.find("[data-enco_map = \"bd_tp_tb\"]:first");
            this.$.bd_bd_wp        = this.element.find("[data-enco_map = \"bd_bd_wp\"]:first");
            this.$.bd_bd_tb        = this.element.find("[data-enco_map = \"bd_bd_tb\"]:first");
            this.$.bd_ft_wp        = this.element.find("[data-enco_map = \"bd_ft_wp\"]:first");
            this.$.bd_ft_tb        = this.element.find("[data-enco_map = \"bd_ft_tb\"]:first");
            this.$.tb_sd_br        = this.element.find("[data-enco_map = \"tb_sd_br\"]:first");
            this.$.tb_bt_br        = this.element.find("[data-enco_map = \"tb_bt_br\"]:first");
            /* Save Object -END*/
        }
        
        /*    private
         * @ 메소드 명          : (SRCH) _nullThrow 
         * @ 설명             : undefined 일 시 throw 한다.
         * @ parameter      : {array|object|number|string} value 
         * @ return         : value
         * @ example        : 
         * 
         *      var t = encoGrid._nullThrow(text);
         */
        var _nullThrow = function _nullThrow(value){
            if([null, undefined].indexOf(typeof value) != -1) {
                console.error(value)
                throw new Error("[value] is undefined or null");
            }
        }
	
//			this.element.find("["+this.dataGroup.map.tb_bt_br+"]:first")
			// 가로
	
		/*    private
         * @ 메소드 명  	    : (SRCH) _saveColumn
         * @ 설명                     : column을 입력 받아 객체 내 가공 컬럼 저장
         * @ save prototype : {array} encoGrid.columns.*            
         * @ parameter      : {array} encoGrid.config.header.column
         * @ return  		: undefined
         */
		var _saveColumn = function _saveColumn(columns) {
		    
		    /* Required Type Check */
			u.isEnableTypes(["array"], [columns])
			
			var target 		  = this,
			frozenColumnIndex = this.config.body.frozenColumnIndex,
			frozenRowIndex 	  = this.config.body.frozenRowIndex,
				   allColumns = [], // 모든 컬럼
				  leftColumns = [], // 열 고정 헤더 
				  bodyColumns = [], // 열 고정 헤더 제외
			   haveKeyColumns = [], // 키 가진 컬럼
	       leftHaveKeyColumns = [], // 키 가진 컬럼 중 열 고정 
	       bodyHaveKeyColumns = [], // 키 가진 컬럼 중 열 고정 제외
			     sumLeftWidth = 0,  // 열 고정 헤더 총 너비
			     sumBodyWidth = 0,  // 열 고정 헤더 총 너비 제외
			     dataSumWidth = 0,  // 테이블 총 너비
			   leftColumnsStr = {}, 
			haveKeyColumnsStr = {},			
						maxLv = 0,
					   maxCol = 0,
				   oneLineRow = 0;
			
			(function _colsLoop(defaultWidth, columns, parentSeq, _lv, gridWidth) {
				
				columns.forEach(function(o, i) {
					// 하위 컬럼을 가질경우
					if(!!o["columns"]) {
					    
					    /* Required Type Check */
						u.isEnableTypes(["array"], [o["columns"]])

						allColumns.push({
					 	     "key" : o["key"],
					 	 "rowspan" : 0,
					 	 "colspan" : 0,
						   "label" : o["label"],
						     "seq" : allColumns.length,
					   "parentSeq" : typeof parentSeq == "undefined" ? -1 : parentSeq, 
						 	  "lv" : _lv,
						  "rowMap" : _lv,
						})
						
						_colsLoop(defaultWidth, o["columns"], allColumns.length-1, _lv+1, gridWidth)
						
					} else {
						// px로 변환
						var _width = o.width ? target._convertToPx(gridWidth, o.width) : defaultWidth;
						dataSumWidth += _width;
							
						/* Throw Error */
						if(!o.hasOwnProperty('key')) {
							console.error(o)
							throw new Error("none key")
						}
						
						allColumns.push({
							"width"    : _width,
					 	     "key"     : o["key"],
						 	 "rowspan" : 0,
						     "colspan" : 1,
							   "label" : o["label"],
							     "seq" : allColumns.length,
						   "parentSeq" : typeof parentSeq == "undefined" ? -1 : parentSeq,
						          "lv" : _lv,
						      "rowMap" : _lv,
						})
				
						
						// set Colspan
						function colspanLoop(seq) {
							if(typeof seq != "undefined" && seq != -1) {
								allColumns[seq]["colspan"]++;
								
								colspanLoop(allColumns[seq]["parentSeq"]);
							}
						}
						colspanLoop(parentSeq)
						
						if(maxLv < _lv) maxLv = _lv
					}
				})
				if(typeof parentSeq != "undefined") return;
				
				// set Rowspan
				maxLv++;
				allColumns.forEach(function(o, i) {
					
					if(o["lv"] == 0)
						maxCol += o["colspan"];
					
					if(o["parentSeq"] != -1) {
						
						o["rowspan"] = maxLv - o["lv"];
						function rowspanLoop(seq) {
							
							if(allColumns[seq]["parentSeq"] != -1) {
								if(allColumns[allColumns[seq]["parentSeq"]]["rowspan"] > Math.abs(allColumns[allColumns[seq]["parentSeq"]]["lv"] - o["lv"])) {
									allColumns[allColumns[seq]["parentSeq"]]["rowspan"] = Math.abs(allColumns[allColumns[seq]["parentSeq"]]["lv"] - o["lv"])
								}
								
								rowspanLoop(allColumns[seq]["parentSeq"])
							} 
						}
						rowspanLoop(i)
					} else {
						
						o["rowspan"] = maxLv
					}
					
				})
			}(this.gridStateInfos.head.cellWidth, columns, undefined, 0, this.gridStateInfos.panel.width))
			
			// Set Column Map
			var rowMap = 0,
				colMap = 0,
				   _lv = 0,
			  _rowVals = function(_maxCol) {
								var _result = {}
								for(var i = 0; i < maxLv; i++) {
									_result[i] = []
									for(var j = 0; j < maxCol; j++) {
										_result[i].push(false)
									}
								}
								return _result
							}(maxCol)

			$.each(allColumns.sort(
					function(x1, x2) {
						return x1["lv"] - x2["lv"] != 0 ? x1["lv"] - x2["lv"]
														: x1["seq"] - x2["seq"]
					}), function(i, o) {
				if(_lv != o["lv"]) {
					_lv = o["lv"]
					colMap = 0
				}
				
				while(_rowVals[o["lv"]][colMap]) {
					colMap++;
				}
				
				o["colMap"] = colMap;
				
				for(var i = o["lv"]; i < o["lv"]+o["rowspan"]; i++) {
					for(var j = colMap; j < colMap+o["colspan"]; j++) {
						_rowVals[i][j] = true
					}
				}
				
			})
			// Set Column Map -END
			
			// Set HaveKeyColumns
			allColumns.forEach(function(o, i) {
				if(!o["key"]) return true;
				
				if(oneLineRow < o.lv) {
					oneLineRow = o.lv
				}
				
				if(o.parentSeq == -1) {
					haveKeyColumns.push(o);
					return false;
				} 
				else 
				if(haveKeyColumns.some(function(oo, ii) {
						return o.parentSeq == oo.seq;  
				})){
					haveKeyColumns.push(o);
					return false;
				} 
				else 
				{
					haveKeyColumns.push($.extend(false, o, {
						rowMap : o.rowMap - 1,
						    lv : o.lv - 1
					}))
					return false;
				}
			})
			// Set HaveKeyColumns -END
			
			// Set LeftColumns, BodyColumns
			for(i = 0, max=allColumns.length; i < max; i++) {
				// 고정열, 바디열 둘 다 포함
				
				var td = allColumns[i];
				
				if(td["colMap"] <= frozenColumnIndex
				&& frozenColumnIndex < td["colMap"] + td["colspan"] - 1) {
					
					bodyColumns.push($.extend(false, td, {
						"colspan" : td["colspan"] - frozenColumnIndex - (td["colMap"] > 0 ? 0 : 1) ,
						 "colMap" : td["colMap"] + frozenColumnIndex + (td["colMap"] > 0 ? 0 : 1),
					}))
					
					leftColumns.push($.extend(false, td, {"colspan" : frozenColumnIndex + 1 - td["colMap"]}))
					
				} 
				else 
				// 고정열에만 포함
				if(td["colMap"] + td["colspan"] <= frozenColumnIndex+1){
					leftColumns.push($.extend(false, td, {"colspan" : frozenColumnIndex}))
				} 
				else 
				// 바디열에만 포함
				{
					bodyColumns.push(td)
				}
			}
			// Set LeftColumns, BodyColumns -END
							
			// Set LeftHaveKeyColumns, BodyHaveKeyColumns
			for(i = 0, max=haveKeyColumns.length; i < max; i++) {
				// 고정열, 바디열 둘 다 포함
				
				var td = haveKeyColumns[i];
				
				if(td["colMap"] <= frozenColumnIndex
				&& frozenColumnIndex < td["colMap"] + td["colspan"] - 1) {
					
					bodyHaveKeyColumns.push($.extend(false, td, {
						"colspan" : td["colspan"] - frozenColumnIndex - (td["colMap"] > 0 ? 0 : 1) ,
						 "colMap" : td["colMap"] + frozenColumnIndex + (td["colMap"] > 0 ? 0 : 1),
					}))
					
					leftHaveKeyColumns.push($.extend(false, td, {"colspan" : frozenColumnIndex + 1 - td["colMap"]}))
					
				} 
				else 
				// 고정열에만 포함
				if(td["colMap"] + td["colspan"] <= frozenColumnIndex+1){
					leftHaveKeyColumns.push($.extend(false, td, {"colspan" : frozenColumnIndex}))
				} 
				else 
				// 바디열에만 포함
				{
					bodyHaveKeyColumns.push(td)
				}
			}
			// Set LeftHaveKeyColumns, BodyHaveKeyColumns -END
							
		
			
			/* Save Object */
			this.gridStateInfos.head.maxRowLv = maxLv;
			this.gridStateInfos.panel.realDataWidth = dataSumWidth;
			this.gridStateInfos.head.height = maxLv * this.gridStateInfos.head.cellHeight;
			this.gridStateInfos.body.height = this.gridStateInfos.panel.tableSumHeight - this.gridStateInfos.head.height
			this.gridStateInfos.body.oneLineRow = oneLineRow 
			
			this.columns.all = allColumns
			this.columns.left = leftColumns
			this.columns.body = bodyColumns
			
			this.columns.haveKey = haveKeyColumns
			this.columns.leftHaveKey = leftHaveKeyColumns
			this.columns.bodyHaveKey = bodyHaveKeyColumns
			/* Save Object -END */
			
			this.repaint("body");
		}
		
		/**
         * @Method : encoGrid.setConfig
         * @작성일 : 2020. 5. 2.
         * @작성자 : 이동원
         * @Desc : 구성을 재정의 한다.
         * @param : _config
         */
        this.setConfig = function(_config) {
            
            this.config = $.extend(true, this.config, _config)
            // 생성 또는 panel config가 다르면 repaint panel header
            if(this.newFlag
            || Object.keys(_config).indexOf("panel") != -1) 
                this.repaint("panel");
            
            // 생성 또는 header config가 다르면 repaint panel header
            if(!this.newFlag
            || Object.keys(_config).indexOf("header") != -1) 
                this.repaint("header");
            
            // 생성 또는 body config가 다르면 repaint panel header
            if(!this.newFlag
            || Object.keys(_config).indexOf("body") != -1) 
                this.repaint("body");
            
        }
		
		this._getSideColumns = function() {
			
			var sideConfig = this.config.body.side,
				  rowCount = this.gridStateInfos.head.maxRowLv,
				cellHeight = this.gridStateInfos.head.cellHeight,
	   	   selectCellWidth = this.gridStateInfos.side.selectCellWidth,
		 lineSortCellWidth = this.gridStateInfos.side.lineSortCellWidth,
				  
			  _resultElStr = "",
			_colgroupElStr = "<colgroup>",
		    selectElStrArr = [] ,
		  lineSortElStrArr = [] ,
		  
			  lineSortShow = sideConfig.lineSort.show,
			    selectShow = sideConfig.select.show,
			   		_width = 0;
			        
			        
			    
			
			if(lineSortShow 
			|| selectShow) {
				for(i = 0; i<rowCount; i++) {
					_resultElStr += (i==0 ? "<tr>" : "</tr><tr>")
					
					if(lineSortShow) {
						if(i == 0) {
							_colgroupElStr += "<col style=\"width : "+ lineSortCellWidth +"px\">"
							_width += lineSortCellWidth
						}
						
						_resultElStr += "<td><input type=\"checkbox\" class=\"checkbox\" data-rowIndex=\""+i+"\" data-colIndex=\"1\"></td>"
					}
					
					if(selectShow) {
						if(i == 0) {
							_colgroupElStr += "<col style=\"width : "+ selectCellWidth +"px\">"
							_width += selectCellWidth
						}
						
						_resultElStr += "<td data-rowIndex=\""+i+"\" data-colIndex=\"2\">"+ i +"</td>"
					}
					
				}
			}
			
			return {
				elStr : _colgroupElStr + _resultElStr,
				width : _width
				
			}
			
		}
		
		
		
		/**
		 * @Method : encoGrid.repaint
		 * @작성일 : 2020. 5. 2.
		 * @작성자 : 이동원
		 * @Desc :
		 * @param : 'panel'||'header'||'body'||'foot'
		 */
		this.repaint = function(area) {
			switch(area) {
			// repaint("panel")
			case "panel" :
				
				// 그리드 버튼 삽입
				this.setControlButton();
					
				// 그리드 title 삽입
				this.setTitle();
					
				// 그리드 width, height 조정
				$(this.element).width(this.config.panel.width)
							   .height(this.config.panel.height)
				break;
				
				
			// repaint("header")
			case "header" :
				this.setColumns(this.config.header.columns) 
				break;
				
				// repaint("header")
			case "body" :
				var _rowCount = (this.element.height() - this.element.find(".enco-panel-head:first").height()) / this.config.body.cellHeight 
				
				
				break;
			}
			
		}
		
		/**
		 * @Method :
		 * @작성일 : 2020. 5. 4.
		 * @작성자 : 이동원
		 * @Desc : 타이틀 삽입
		 * @param :
		 * @return :
		 */
		this.setTitle = function() {
			$(this.element).find(".enco-panel-title:first")
			.html(this.config.panel.title)
		}
		
		
		/**
		 * @Method : -
		 * @작성일 : 2020. 5. 4.
		 * @작성자 : 이동원
		 * @Desc : 컨트롤 버튼 삽입
		 * @param :
		 * @return :
		 */
		this.setControlButton = function() {
			// 그리드 control 버튼 삽입
			$(this.element).find("["+this.dataGroup.map.pan_ctl_btn_grp+"]:first")
				.append($(function(target, ctlBtns) {
					var btnStr = ""
						
					if(ctlBtns.blind) {
						btnStr +=
							  "<button type='button' class='btn btn-default' data-toggle='collapse'>"
								+ "<span class='glyphicon glyphicon-menu-down' aria-hidden='true'></span>"
							+ "</button>"
							
//							.click(function(e){
//								target.element.find("div.table-wrap").toggle({
//									effect : "blind",
//								})
//								
//								target.blindState = !target.blindState
//								
//								target.config.panel.controlBtn.onBtnblindClick.call(target.blindState)
//							})
						
					}
					if(ctlBtns.minimize) {
//						btnArr.push(
//							$("<button></button>").button({
//								icon: "ui-icon-extlink", 
//								showLabel: false
//							})
//						)
					}
					if(ctlBtns.popUp) {
//						btnArr.push(
//							$("<button></button>").button({
//								icon: "ui-icon-newwin", 
//		    	  				showLabel: false
//		    	  			})
//		    	  		)
		    	  	}
		    	  	return btnStr 
				}(this, this.config.panel.controlBtn)))
		}
		
		
		/* 
         * @ 메소드 명  	    : (SRCH) getList 
         * @ 설명				: 그리드 내 데이터 리턴
         * @ parameter  	: {boolean} containEmptyData 
         * @ return  		: {array} list
         * @ example 		: 
         * 
         *      encoGrid.getList(false) or encoGrid.getList()
         *          // 빈 데이터를 포함하지 않음
         *          
         *      encoGrid.getList(true)
         *          // 빈 데이터 포함 {key : undefined}
         */
		this.getList = function(containEmptyData) {
			return function() {
				var _result = []
				
				$.each(this.list, function(i, o) {
					
					var _resultEl = {}
					
					$.each(o, function(ii, oo) {
						if(oo) {
							_resultEl[ii] = oo
						}
					})
					_result.push(_resultEl)
				}) 
				return _result
			}.call(this)
		}
		
		this.setList = function(list) {
		    console.log(this)
		    _saveList.call(this, list)
		}
		
		
		
		
		
		
// *********************util*********************************************************
		
		this._convertToPx = function(parentCont, objCont) {
			
			switch(typeof objCont) {
			case "string" :
				if(objCont.indexOf("px") != -1) {
					return Number(objCont.replace("px", "").trim())
				}
				else 
				if(objCont.indexOf("%") != -1) {
					if(typeof parentCont == "undefined"
					|| ( typeof parentCont == "string" 
					&&   parentCont.indexOf("%") != -1)) {
						console.error(object)
						throw new Error("구할 수 없는 길이")
					}
					
					return Number(String(parentCont).replace("px", "")) * Number(objCont.replace("%", "")) / 100
					
				}
				
			default :
				return objCont;
			}
			
		},
		
		
		
// ***********************constructor*************************************************		
		/**
		 * @작성일 : 2020. 5. 2.
		 * @작성자 : 이동원
		 * @Desc : constructor
		 * @param : config
		 */
		this.main = function(_config) {
		    
		    

			/* Save Object */
			this.config = $.extend(true, this.config, _config);
			
			this.gridStateInfos.panel.height = this._convertToPx(window.innerHeight, this.config.panel.height)
			this.gridStateInfos.panel.width  = this._convertToPx(window.innerWidth, this.config.panel.width)
			this.gridStateInfos.panel.titleHeight = this._convertToPx(window.innerHeight, this.config.panel.titleHeight)
			this.gridStateInfos.panel.tableSumHeight = this.gridStateInfos.panel.height - this.gridStateInfos.panel.titleHeight 
			
			this.gridStateInfos.head.cellHeight  = this._convertToPx(undefined, this.config.header.cellHeight)
			this.gridStateInfos.head.cellWidth  = this._convertToPx(this.gridStateInfos.panel.width, this.config.cellWidth)
			
			this.gridStateInfos.body.cellHeight  = this._convertToPx(undefined, this.config.body.cellHeight)
			this.gridStateInfos.body.cellWidth  = this._convertToPx(this.gridStateInfos.panel.width, this.config.cellWidth)
			this.gridStateInfos.side.lineSortCellWidth  = this._convertToPx(undefined, this.config.body.side.lineSort.cellWidth)
			this.gridStateInfos.side.selectCellWidth  = this._convertToPx(undefined, this.config.body.side.select.cellWidth)
			
			this.classes = $.extend(true, this.classes, this.config.classes)
			/* Save Object -END*/
			
			// 최초 그리드 생성
			_create.call(this);
			
		}.call(this, _bindingConfig)
		
		return {
			// data
			element : this.element,
			columns : this.columns,
			config  : this.config,
			list : this.list,
			thInfo : this.thInfo,
			haveKeyThInfo : this.haveKeyThInfo,
			dataGroup : this.dataGroup,
			gridStateInfos : this.gridStateInfos,
			
			// function
			repaint : this.repaint,
			getClass : this.getClass,
			setConfig : this.setConfig,
			setColumns : this.setColumns,
			setList : this.setList,
			getList : this.getList,
			map : this.dataGroup
			
			
		}
	}
	
		
})();






