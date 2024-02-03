import { Box, Checkbox, Flex, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getBucket } from '@extend-chrome/storage';
import { MySettings } from '../types';

const bucket = getBucket<MySettings>('settings', 'sync');

const Popup = () => {
  const [reccomendCancel, setReccomendCancel] = useState<boolean>(false);
  const [nextEpisodeCancel, setNextEpisodeCancel] = useState<boolean>(false);

  const handleChangeReccomendCancel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setReccomendCancel(value);
    bucket.set({ reccomendCancel: value });
  };

  const handleChangeNextEpisodeCancel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setNextEpisodeCancel(value);
    bucket.set({ nextEpisodeCancel: value });
  };

  useEffect(() => {
    bucket.get('reccomendCancel').then(({ reccomendCancel }) => {
      setReccomendCancel(reccomendCancel);
    });
    bucket.get('nextEpisodeCancel').then(({ nextEpisodeCancel }) => {
      setNextEpisodeCancel(nextEpisodeCancel);
    });
  }, []);

  return (
    <>
      <Flex style={{ width: '400px', height: 'auto' }} justify={'center'} align={'center'}>
        <Box
          style={{
            width: '100%',
            borderRadius: '5px',
            backgroundColor: 'lightgray',
            padding: '12px',
            margin: '12px',
          }}
        >
          <Text>設定</Text>
          <Flex gap={'4px'} direction={'column'}>
            <Checkbox
              checked={reccomendCancel}
              label="おすすめ自動キャンセル"
              onChange={handleChangeReccomendCancel}
            ></Checkbox>
            <Checkbox
              checked={nextEpisodeCancel}
              label="次のエピソード自動キャンセル"
              onChange={handleChangeNextEpisodeCancel}
            ></Checkbox>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Popup;
