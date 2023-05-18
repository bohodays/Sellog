

async function uploadOnePostingOnSellog(message) {
    const token = await getToken();
    if (isNull(token)) {
      console.error('token is null', token);
      return;
    }
    return upload(token, message);
  }
  
  async function upload(token, message) {
    spinnerStart();
    const git = new GitHub(token);
    const stats = await getStats();
    await git.createRecord("blog", message, "");
    setTimeout(spinnerStop, 1000);
  }
  
  /* [spinnerStart 시작 이벤트 호출] */
	function spinnerStart(){

		// [로딩 부모 컨테이너 동적 생성] 회색화면
		var createLayDiv = document.createElement("div");
		
		// 설정
		createLayDiv.setAttribute("id", "spinnerLay1000");
		var createLayDivStyle = "width:100%; height:100%; margin:0 auto; padding:0; border:none;";
		createLayDivStyle = createLayDivStyle + " float:top; position:fixed; top:0%; z-index:1000;";
		createLayDivStyle = createLayDivStyle + " background-color:rgba(0, 0, 0, 0.3);"; // 불투명도 설정 >> 자식에게 적용 안됨
		createLayDiv.setAttribute("style", createLayDivStyle);
		
		document.body.appendChild(createLayDiv); //body에 추가 실시


		// [실제 스핀 수행 컨테이너 동적 생성] 스피너
		var createSpinDiv = document.createElement("div");
		
		//설정
		createSpinDiv.setAttribute("id", "spinnerContainer1000");
		var createSpinDivStyle = "width:100px; height:100px; margin:0 auto; padding:0; border:none;"; // 스핀 컨테이너 크기 조절
		createSpinDivStyle = createSpinDivStyle + " float:top; position:relative; top:40%;";
		//createSpinDivStyle = createSpinDivStyle + " background-color:#ff0000;";  
		createSpinDiv.setAttribute("style", createSpinDivStyle);
		
		document.getElementById("spinnerLay1000").appendChild(createSpinDiv); //spinnerLay에 추가 실시


		// [스핀 옵션 지정 실시]
		var opts = {
			lines: 10, // 그릴 선의 수 [20=원형 / 10=막대] [The number of lines to draw]
			length: 10, // 각 줄의 길이 [0=원형 / 10=막대] [The length of each line]
			width: 15, // 선 두께 [The line thickness]
			radius: 42, // 내부 원의 반지름 [The radius of the inner circle]
			scale: 0.85, // 스피너의 전체 크기 지정 [Scales overall size of the spinner]
			corners: 1, // 모서리 라운드 [Corner roundness (0..1)]
			color: '#003399', // 로딩 CSS 색상 [CSS color or array of colors]
			fadeColor: 'transparent', // 로딩 CSS 색상 [CSS color or array of colors]
			opacity: 0.05, // 선 불투명도 [Opacity of the lines]
			rotate: 0, // 회전 오프셋 각도 [The rotation offset]
			direction: 1, // 회전 방향 시계 방향, 반시계 방향 [1: clockwise, -1: counterclockwise]
			speed: 1, // 회전 속도 [Rounds per second]
			trail: 74, // 꼬리 잔광 비율 [Afterglow percentage]
			fps: 20, // 초당 프레임 수 [Frames per second when using setTimeout() as a fallback in IE 9]
			zIndex: 2e9 // 인덱스 설정 [The z-index (defaults to 2000000000)]
		};


		// [스피너 매핑 및 실행 시작]
		var target = document.getElementById("spinnerContainer1000");
		var spinner = new Spinner(opts).spin(target);
	};


	/* [spinnerStop 중지 이벤트 호출] */
	function spinnerStop(){
		// console.log("[spinnerStop] : " + "[start]");
		try {
			// [로딩 부모 컨테이너 삭제 실시]
			var tagId = document.getElementById("spinnerLay1000");
			document.body.removeChild(tagId); //body에서 삭제 실시 
		}
		catch (exception) {
			console.log(exception);
		}

	};