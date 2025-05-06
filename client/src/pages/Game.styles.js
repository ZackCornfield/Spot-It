import { styled, keyframes } from "styled-components";

// Enhanced animations
const energyPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
  50% {
    box-shadow: 0 0 25px #ff0000, 0 0 50px #ff0000;
    transform: translateX(-50%) translateY(-50%) scale(1.1);
  }
`;

const cosmicSpin = keyframes`
  0% {
    transform: rotate(0deg);
    border-color: #f3f3f3 #3498db #f3f3f3 #3498db;
  }
  50% {
    border-color: #f3f3f3 #e23636 #f3f3f3 #e23636;
  }
  100% {
    transform: rotate(360deg);
    border-color: #f3f3f3 #3498db #f3f3f3 #3498db;
  }
`;

// Theme colors
const theme = {
  primary: '#1f1f1f',
  accent: '#e23636', // Marvel red
  secondary: '#504a4a',
  text: '#ffffff',
  border: '#767676',
  success: '#1e8900',
  hover: '#2d2d2d'
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(135deg, ${theme.primary} 0%, #000000 100%);
  color: ${theme.text};
  min-height: 100vh;
  width: 99vw;
  overflow-x: hidden;
`;

export const DisplayPanelContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
`;

export const DisplayPanel = styled.div`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  background: rgba(31, 31, 31, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 40px;
  border: 4px solid ${theme.accent};
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(226, 54, 54, 0.3);
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
`;

export const Title = styled.h1`
  text-align: center;
  color: ${theme.text};
  font-family: 'Title-Font';
  font-size: 4.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 3px 3px 0 ${theme.accent},
               6px 6px 0 rgba(226, 54, 54, 0.3);
  margin: 0;
`;

export const SubTitle = styled.h2`
  color: ${theme.text};
  font-family: 'Description-Font';
  font-size: 2rem;
  text-align: center;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const Description = styled.p`
  color: ${theme.text};
  font-family: 'Description-Font';
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  padding: 5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
  width: 50%;
  height: 50px;
  font-family: 'Description-Font';
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(45deg, ${theme.accent} 0%, #ff4747 100%);
  color: ${theme.text};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &:disabled {
    background: ${theme.secondary};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const TargetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background: rgba(31, 31, 31, 0.8);
  border-radius: 8px;
  backdrop-filter: blur(5px);
`;

export const TargetsSubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.5s ease;
  background-color: ${(props) => (props.guessed ? theme.success : 'transparent')};
  opacity: ${(props) => (props.guessed ? "0.6" : "1")};
  

  &:hover {
    background-color: ${props => props.guessed ? theme.success : theme.hover};
  }
`;

export const ScoresContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  gap: 10px;
  width: 50%;
  background: rgba(31, 31, 31, 0.8);
  border-radius: 8px;
  backdrop-filter: blur(5px);
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: relative;
  margin-top: 12vh;
  z-index: 0;
`;


export const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(90deg, ${theme.primary} 0%, #000000 100%);
  border-bottom: 3px solid ${theme.accent};
  color: ${theme.text};
  opacity: 0.95;
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0; /* Ensure it's at the top of the screen */
  left: 0;
  transition: transform 0.5s ease; /* Use transform for smooth sliding */
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(-100%)')}; /* Slide in and out */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  padding: 10px;
`;

export const TargetsHeaderContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px;
  align-items: center;
  background: rgba(31, 31, 31, 0.8);
  border-radius: 6px;
`;

export const GameBackgroundImage = styled.img`
  width: 100vw;
  height: auto;
  display: block;
  filter: ${({ isBlurred }) => (isBlurred ? "none" : "blur(5px)")};
  transition: filter 0.3s ease;
  object-fit: cover;
`;

export const GameGuessClick = styled.div`
  z-index: 2;
  position: absolute;
  width: 40px;
  height: 40px;
  border: solid 3px ${theme.accent};
  border-radius: 50%;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  animation: ${energyPulse} 1.5s ease-in-out infinite;
`;

export const GameGuessForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  position: fixed;
  gap: 15px;
  text-align: center;
  width: 280px;
  background: rgba(31, 31, 31, 0.95);
  backdrop-filter: blur(10px);
  border: 4px solid ${theme.accent};
  border-radius: 12px;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 30px rgba(226, 54, 54, 0.3);
`;

export const GameGuessFormSubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.guessed ? theme.success : 'transparent')};
  opacity: ${(props) => (props.guessed ? 0.6 : 1)};
  cursor: ${(props) => (props.guessed ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${props => props.guessed ? theme.success : theme.hover};
  }
`;

export const GameGuessCircle = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${theme.accent};
  box-shadow: 0 0 10px rgba(226, 54, 54, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(90deg, ${theme.primary} 0%, #000000 100%);
  border-top: 3px solid ${theme.accent};
  color: ${theme.text};
  opacity: 0.95;
  height: 50px;
  width: 100vw;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const FooterTitle = styled.p`
  color: ${theme.text};
  font-family: 'Title-Font';
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

export const Input = styled.input`
  width: 60%;
  padding: 15px;
  margin: 8px 0;
  background: ${theme.secondary};
  color: ${theme.text};
  border: 2px solid ${theme.border};
  border-radius: 8px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  caret-color: transparent;

  &:focus {
    outline: none;
    border-color: ${theme.accent};
    box-shadow: 0 0 10px rgba(226, 54, 54, 0.3);
  }
`;

export const LoadingCircle = styled.div`
  width: 38px;
  height: 38px;
  border: 4px solid;
  border-radius: 50%;
  animation: ${cosmicSpin} 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
`;