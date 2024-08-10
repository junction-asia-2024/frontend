import styled from '@emotion/styled';

const CONPLAINT_TYPE = ['크랙', '포트홀', '배너', '쓰레기', '불법주정차'];
const BG_COLOR = ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];

type IdleProps = {
  state: FlowState;
  next: () => void;
  setContext: (type: string) => void;
};

const Idle = ({ state, next, setContext }: IdleProps) => {
  return (
    <Container>
      <div
        style={{
          fontSize: '24px',
          lineHeight: '1.2',
          letterSpacing: '-1px',
          padding: '60px 0px 20px 0',
        }}
      >
        <br />
        어떤 문제를 발견하셨나요?
      </div>
      <Grid>
        {CONPLAINT_TYPE.map((type) => (
          <GridItem
            style={{
              backgroundColor: BG_COLOR[CONPLAINT_TYPE.indexOf(type)],
            }}
            key={type}
            onClick={() => {
              setContext(type);
              next();
            }}
          >
            {type}
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Idle;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  width: 100%;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 50px;
  border-radius: 4px;
  color: #fff;
  font-size: 24px;
  font-weight: medium;
  cursor: pointer;
  height: 97px;
  line-height: 1.2;
  padding: 12px 15px;
`;
