import styled from 'styled-components';
import detail from '../../../asset/missiondetail.png';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 100vw;
`;
export const FontTag = styled.div`
  font-family: 'HSYuji-Regular';
  font-size: 14px;
  margin-top: 10px;
  width: 75%;
  margin-left: 45px;
  display: flex;
  justify-content: center;
`;
export const MiniTitle = styled.div`
  font-family: 'HSYuji-Regular';
  color: #ff8a3d;
  font-size: 20px;
  margin-top: 20px;
  text-decoration: underline;
  margin-left: 35px;
  width: 78%;
  display: flex;
  justify-content: center;
`;

export const Title = styled.div`
  font-family: 'HSYuji-Regular';
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 5px;
`;
export const BackGroundContainer = styled.div`
  background-image: url(${detail});
  background-size: 100% 100%;
  height: 70vh;
  width: 50vh;
  margin-top: 5px;
`;
