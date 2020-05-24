var grid;
var firstGrid
$( document ).ready(function() {
	
	//document.getElementById("grid")
	grid = new Enco.Grid($("#grid"), {
		panel : {title : "test", controlBtn : {
			onBtnblindClick : function() {
			}
		}},
		header : {columns : [
			{label : "0", width : 100, columns : [
				{key :"30", label : "30", width : 50},
				{label : "1", width : 50, columns : [
				{key:"2", label : "2", width : 50},
					{key : "3", label : "3", width : 50, columns : [
						{key : "4", label : "4", width : 50},
						{key : "3", label : "3", width : 50, columns : [
							{key : "4", label : "4", width : 50},
							{key : "3", label : "3", width : 50, columns : [
								{key : "4", label : "4", width : 50},
								{key : "3", label : "3", width : 50, columns : [
									{key : "4", label : "4", width : 50},
								]}
							]}
					]},
						
					]},
					{label : "26", width : 50, columns : [
						{key : "27", label : "17", width : 50},
						{key : "28", label : "28", width : 50},
					]},
				]},
				{label : "6", width : 50, columns : [
					{key : "7", label : "7", width : 50, columns : [
						{key : "8", label : "8", width : 50},
						{key : "9", label : "9", width : 50},
					]},
					{key : "10", label : "10", width : 50, columns : [
						{key : "11", label : "11", width : 50},
						{key : "12", label : "12", width : 50, columns : [
							{key : "13", label : "13", width : 50},
							{key : "14", label : "14", width : 50},
						]},
					]},
					{label : "15", width : 50, columns : [
						{key : "16", label : "16", width : 50},
						{key : "17", label : "17", width : 50, columns : [
							{key : "18", label : "18", width : 50},
							{key : "19", label : "19", width : 50},
						]},
					]},
				]},
				{key : "20", label : "20", width : 50},
			]},
			
		]}
		, body : {
			frozenColumnIndex : 1
		}
	});
	console.log(grid)
	
	grid.setList([
		{"1" : 100, "2" : 150, "3" : 100, "20" : "dd"},
		{"7" : 500, "aa" : 150},
		{"1" : 500, "aa" : 150},
		{"7" : 100, "aa" : 150},
		{"7" : 500, "aa" : 150},
		{"1" : 500, "aa" : 150},
		{"7" : 100, "aa" : 150},
		{"7" : 500, "aa" : 150},
		{"1" : 500, "aa" : 150},
		{"7" : 100, "aa" : 150},
		{"7" : 500, "aa" : 150},
		{"1" : 500, "aa" : 150}
	])
	
	console.log(grid.getList())
	
	
//	firstGrid = new ax5.ui.grid();
//	 
//    firstGrid.setConfig({
//        target: $('[data-ax5grid="first-grid"]'),
//        frozenColumnIndex : 2,
//        columns : [
//			{label : "0", width : 100, columns : [
//				{key : "30", label : "30", width : 50},
//				{key : "1", label : "1", width : 50, columns : [
//				{key : "2", label : "2", width : 50},
//					{key : "3", label : "3", width : 50, columns : [
//						{key : "4", label : "4", width : 50},
//						{key : "3", label : "3", width : 50, columns : [
//							{key : "4", label : "4", width : 50},
//							{key : "3", label : "3", width : 50, columns : [
//								{key : "4", label : "4", width : 50},
//								{key : "3", label : "3", width : 50, columns : [
//									{key : "4", label : "4", width : 50},
//								]}
//							]}
//					]},
//						
//					]},
//					{key : "26", label : "26", width : 50, columns : [
//						{key : "27", label : "17", width : 50},
//						{key : "28", label : "28", width : 50},
//					]},
//				]},
//				{key : "6", label : "6", width : 50, columns : [
//					{key : "7", label : "7", width : 50, columns : [
//						{key : "8", label : "8", width : 50},
//						{key : "9", label : "9", width : 50},
//					]},
//					{key : "10", label : "10", width : 50, columns : [
//						{key : "11", label : "11", width : 50},
//						{key : "12", label : "12", width : 50, columns : [
//							{key : "13", label : "13", width : 50},
//							{key : "14", label : "14", width : 50},
//						]},
//					]},
//					{key : "15", label : "15", width : 50, columns : [
//						{key : "16", label : "16", width : 50},
//						{key : "17", label : "17", width : 50, columns : [
//							{key : "18", label : "18", width : 50},
//							{key : "19", label : "19", width : 50},
//						]},
//					]},
//				]},
//				{key : "20", label : "20", width : 50},
//			]},
//			
//		]
//    });
//    firstGrid.setData([
//		{"1" : 100, "2" : 150, "3" : 100, "20" : "dd"},
//		{"7" : 500, "aa" : 150},
//		{"1" : 500, "aa" : 150},
//		{"7" : 100, "aa" : 150},
//		{"7" : 500, "aa" : 150},
//		{"1" : 500, "aa" : 150},
//		{"7" : 100, "aa" : 150},
//		{"7" : 500, "aa" : 150},
//		{"1" : 500, "aa" : 150},
//		{"7" : 100, "aa" : 150},
//		{"7" : 500, "aa" : 150},
//		{"1" : 500, "aa" : 150}
//	]);
//
//    gridList = [{a: "A", b: "A01", c:"C", d:"D", e:"E", f:"F", g:"G"}]
//    // 값이 없는 h 는 표현안됨
//    firstGrid.setData(gridList);
    // 그리드 데이터 가져오기
    /*
    $.ajax({
        method: "GET",
        url: API_SERVER + "/api/v1/ax5grid",
        success: function (res) {
            firstGrid.setData(res);
        }
    });
    */
	
});