import Family from '@/components/InvitationMessage/Family';
import content from '@/app/content.json';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import NoSSR from '@/components/NoSSR';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const InvitationMessage = () => {
  const groom = {
    name: '정현',
    father: '안재흥',
    mother: '정선순',
  };

  const bride = {
    name: '지원',
    father: '박창규',
    mother: '이연화',
  };

  return (
    <div className={'flex flex-col gap-20 text-lg'}>
      <div className={'text-left mx-auto pb-20 border-b'}>
        {content.invitationMessage
          .split('\n')
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))
        }
      </div>
      <div className={'mx-auto pb-10 border-b'}>
        <NoSSR>
          <ThemeProvider theme={createTheme({
            palette: { primary: { main: '#FEF9C3' } },
          })}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ko'}>
              <DateCalendar value={dayjs('2024-07-06')} readOnly views={['day']}/>
            </LocalizationProvider>
          </ThemeProvider>
        </NoSSR>
      </div>
      <div className={'flex flex-col gap-4 mx-auto px-10 pb-20 border-b'}>
        <Family father={groom.father} mother={groom.mother} position={'장남'} me={groom.name}/>
        <Family father={bride.father} mother={bride.mother} position={'장녀'} me={bride.name}/>
      </div>
    </div>
  );
};

export default InvitationMessage;
