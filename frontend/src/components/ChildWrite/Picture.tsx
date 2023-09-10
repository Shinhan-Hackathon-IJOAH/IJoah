import React,{useState} from 'react';

const Picture = () => {
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일 그 자체

    // 파일 전송을 위한 폼데이터 생성하기 
    const formData = new FormData();
    const handleChangeFile = (event:any) => {
        console.log(event.target.files)
        setImgFile(event.target.files);
        formData.append("file", event.target.files)
        setImgBase64([]);
        for(var i=0;i<event.target.files.length;i++){
        if (event.target.files[i]) {
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
          // 파일 상태 업데이트
          reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행됩니다.
            const base64 = reader.result;
            console.log(base64)
            if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString()
               
            // setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
              // 파일 base64 상태 업데이트
            //  console.log(images)
            }
          }
        }
      }
    
      }


return (
    <div>    
      <input
        multiple // 여러 개의 파일 업로드하기
        type="file"
        name="file"
        accept="image/png, image/jpeg" // 업로드 할 파일 형식 지정하기
        onChange={handleChangeFile}
      />
    </div>
    );
};

export default Picture;