
export default (swipercss,choumeicss,script1,script2) => {
  return ` 

<!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>轮播图</title>
    <meta name="viewport" content="initial-scale=1">
    
    <style>
      ${swipercss}
      ${choumeicss}
      .swiper-slide{
        height:300px
      }
      .img-box{
        width:100%;
        height:55%;
        background:red
      }
      .title-box{
        text-align:center;
        width:100%;
        height:11%;
        line-height:50px;
        color:#293478;
        font-size:22px;
        font-weight:bold;
      }
      .imgName-box{
        width:100%;
        height:24%;
        background:red;
        text-align:center;
      }
      .titleItem-box{
        text-align:center;
        width:100%;
        height:10%;
        line-height:50px;
        color:#434C88;
        font-size:18px;
        font-weight:bold;
      }

    </style>
    </head> 
    <body style="width:100%;height:100%" >
    <div class="swiper-container" style="width:100%;height:100%;background:#010820">
      <div class="swiper-wrapper"  style="width:100%;height:100%">
        <div class="swiper-slide" onclick="callCount();">
            <div style="font-weight:bold;font-size:24px;position:absolute;width:100%;height:10%;top:-4%;text-align:center;z-index:500;color:#fff">信用卡激活</div>
            <div style="font-weight:bold;font-size:24px;position:absolute;width:100%;height:10%;top:0.8%;text-align:center;z-index:500;color:#A1B8F6">___</div>
            <div style="position:absolute;width:100%;height:140%;margin-top:13%;background:#ddd;border-radius:10px;overflow:hidden">
              <div class="img-box">
                图片
              </div>
              <div class="title-box">信用卡激活</div>
              <div class="imgName-box">图片区域</div>
              <div class="titleItem-box">远程柜员</div>
            </div>
        </div>
        <div class="swiper-slide">
            <div style="position:absolute;width:100%;height:140%;margin-top:8%;background:#ddd;border-radius:10px;overflow:hidden"></div>
            <div style="position:absolute;width:100%;height:10%;top:-3%;text-align:center;z-index:500;color:#fff">信用卡激活</div>
        </div>
        <div class="swiper-slide">
            <div style="position:absolute;width:100%;height:140%;margin-top:8%;background:#ddd;border-radius:10px;overflow:hidden"></div>
        </div>
        <div class="swiper-slide">
            <div style="position:absolute;width:100%;height:140%;margin-top:8%;background:#ddd;border-radius:10px;overflow:hidden"></div>
        </div>

        <div class="swiper-slide">
            <div style="position:absolute;width:100%;height:140%;margin-top:8%;background:#ddd;border-radius:10px;overflow:hidden"></div>
        </div>
        <div class="swiper-slide">
            <div style="position:absolute;width:100%;height:140%;margin-top:8%;background:#ddd;border-radius:10px;overflow:hidden"></div>
        </div>
      </div>
     
    </div>
   
    
    <script>
      ${script1}
    </script>
    <script>
      ${script2}
    </script>
    <script>


    function callCount() {  
      alert(2333)

    }



     
    </script>
   

    </body>
    </html>  
`;
}; 