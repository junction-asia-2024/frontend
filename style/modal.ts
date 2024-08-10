export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 429,
  height: 'fit-content',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: '20px 30px',
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '20px',
  '@media (max-width: 1024px)': {
    width: 355,
    padding: '30px 20px',
  },
  '&:focus': {
    outline: 'none',
  },
};
