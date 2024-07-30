import styled from '@emotion/styled';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

export const EditArea = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Toolbar = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
`;

export const ToolButton = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#4a90e2' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#333333'};
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#3a7bd5' : '#f0f0f0'};
  }
`;

export const ColorPickerContainer = styled.div`
  .react-colorful {
    width: 120px;
    height: 120px;
  }
`;

export const SideBySideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const StageContainer = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  overflow: hidden;
  width: 48%;
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;