import styled from '@emotion/styled';

const CONPLAINT_TYPE_LIST = [
  {
    id: 1,
    name: '크랙',
    value: 'crack',
    color: '#005ea9',
    svg: (
      <svg
        width="50"
        height="83"
        viewBox="0 0 50 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.9905 65.9967L40.0412 35.557H22.5464L31.3339 5.23783H5.25251V47.1405H18.9905V65.9967ZM13.7379 83V52.3783H0V0H38.2829L29.4955 30.3192H50L13.7379 83Z"
          fill="#004983"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: '포트홀',
    value: 'pothole',
    color: '#005ea9',
    svg: (
      <svg
        width="50"
        height="83"
        viewBox="0 0 50 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 2.5H47.5V80.5H2.5V2.5Z"
          stroke="#004983"
          strokeWidth="5"
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: '배너',
    value: 'banner',
    color: '#005ea9',
    svg: (
      <svg
        width="50"
        height="83"
        viewBox="0 0 50 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M47.5 41.5C47.5 52.5829 44.7887 62.4958 40.5362 69.5549C36.2547 76.6622 30.6854 80.5 25 80.5C19.3146 80.5 13.7453 76.6622 9.46378 69.5549C5.21133 62.4958 2.5 52.5829 2.5 41.5C2.5 30.4171 5.21133 20.5042 9.46378 13.4451C13.7453 6.33781 19.3146 2.5 25 2.5C30.6854 2.5 36.2547 6.33781 40.5362 13.4451C44.7887 20.5042 47.5 30.4171 47.5 41.5Z"
          stroke="#004983"
          strokeWidth="5"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: '쓰레기',
    value: 'trash',
    color: '#005ea9',
    svg: (
      <svg
        width="54"
        height="87"
        viewBox="0 0 54 87"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.1667 66.5556L31.1667 75.7778C31.1667 78.2237 30.2887 80.5694 28.7259 82.2989C27.1631 84.0284 25.0435 85 22.8333 85L14.5 85C13.3949 85 12.3351 84.5142 11.5537 83.6494C10.7723 82.7847 10.3333 81.6118 10.3333 80.3889L10.3333 73.4722M31.1667 66.5556L31.1667 36.5833M31.1667 66.5556L47.9542 55.4105C49.1881 54.5911 50.2093 53.4321 50.9184 52.0463C51.6274 50.6604 52 49.095 52 47.5024L52 36.5833M10.3333 73.4722C8.12319 73.4722 6.00358 72.5006 4.44078 70.7711C2.87797 69.0416 2 66.6959 2 64.25C2 61.8041 2.87797 59.4584 4.44078 57.7289C6.00358 55.9994 8.12319 55.0278 10.3333 55.0278M10.3333 73.4722C12.5435 73.4722 14.6631 72.5006 16.2259 70.7711C17.7887 69.0416 18.6667 66.6959 18.6667 64.25C18.6667 61.8041 17.7887 59.4584 16.2259 57.7289C14.6631 55.9994 12.5435 55.0278 10.3333 55.0278M31.1667 36.5833L52 36.5833M31.1667 36.5833L31.1667 11.2222M52 36.5833L52 23.3956C52.0008 21.2628 51.3335 19.1957 50.1119 17.5461C48.8903 15.8966 47.1898 14.7666 45.3 14.3486L31.1667 11.2222M31.1667 11.2222C31.1667 8.77634 30.2887 6.43063 28.7259 4.70112C27.1631 2.97162 25.0435 2 22.8333 2L14.5 2C13.3949 2 12.3351 2.48581 11.5537 3.35056C10.7723 4.21531 10.3333 5.38817 10.3333 6.61111L10.3333 13.5278M10.3333 13.5278C8.1232 13.5278 6.00358 14.4994 4.44078 16.2289C2.87798 17.9584 2 20.3041 2 22.75C2 25.1959 2.87798 27.5416 4.44078 29.2711C6.00358 31.0006 8.12319 31.9722 10.3333 31.9722M10.3333 13.5278C12.5435 13.5278 14.6631 14.4994 16.2259 16.2289C17.7887 17.9584 18.6667 20.3041 18.6667 22.75C18.6667 25.1959 17.7887 27.5416 16.2259 29.2711C14.6631 31.0006 12.5435 31.9722 10.3333 31.9722M10.3333 31.9722L10.3333 55.0278"
          stroke="#004983"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: '불법주정차',
    value: 'vehicle',
    color: '#005ea9',
    svg: (
      <svg
        width="50"
        height="83"
        viewBox="0 0 50 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.35917 83C7.69694 83 6.27694 82.132 5.09917 80.3959C3.92194 78.659 3.33333 76.5649 3.33333 74.1136V11.7216H0V4.34798H15V0H35V4.34798H50V11.7216H46.6667V74.1136C46.6667 76.5968 46.0833 78.6987 44.9167 80.4192C43.75 82.1397 42.3247 83 40.6408 83H9.35917ZM41.6667 11.7216H8.33333V74.1136C8.33333 74.5552 8.42944 74.9177 8.62167 75.2012C8.81389 75.4846 9.05972 75.6264 9.35917 75.6264H40.6408C40.8975 75.6264 41.1325 75.4687 41.3458 75.1532C41.5597 74.8386 41.6667 74.4921 41.6667 74.1136V11.7216ZM16.3467 65.7949H21.3458V21.5531H16.3467V65.7949ZM28.6542 65.7949H33.6533V21.5531H28.6542V65.7949Z"
          fill="#004983"
        />
      </svg>
    ),
  },
];

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
        {CONPLAINT_TYPE_LIST.map((type) => (
          <GridItem
            style={{
              backgroundColor: type.color,
              position: 'relative',
              overflow: 'hidden',
            }}
            key={type.id}
            onClick={() => {
              setContext(type.value);
              next();
            }}
          >
            {type.name}
            <div
              style={{
                width: 'fit-content',
                height: 'fit-content',
                position: 'absolute',
                right: '20px',
                top: '-15px',
              }}
            >
              {type.svg}
            </div>
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
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: rotate(1deg);
  }
`;
