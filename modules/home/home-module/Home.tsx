import {
  cityData,
  countryData,
  feedBackData,
  highlightData,
  recomendData,
  tabData,
} from '@/components/mock-data/MockDataConstant'
import {
  FeedBackFromTravelers,
  HighlightData,
  RecommendedDataType,
} from '@/components/mock-data/MockDataType'
import { CustomSlider } from '@/components/slider/Slider'
import TabBase from '@/components/tab/tab-base/TabBase'
import { useState } from 'react'
import { CardExplore, CardFeedBack, CardProduct, CardsWithTitle } from '../home-comps'
import { CardDestinations } from '../home-comps/card-destinations/CardDestinations'

export const HomeModule = () => {
  const [currentTab, setCurrentTab] = useState<string>(tabData[0])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: 40 }}>
      <CardsWithTitle title="Các điểm đến thu hút nhất Việt Nam">
        <CustomSlider
          dot={false}
          ItemCard={cityData.map((item: RecommendedDataType) => (
            <CardDestinations key={item.id} data={item} />
          ))}
          numberDisplay={6}
        />
      </CardsWithTitle>
      <CardsWithTitle title="Khám phá thêm nhà cho thuê du lịch">
        {recomendData.map((item: RecommendedDataType) => (
          <CardExplore key={item.id} data={item} />
        ))}
      </CardsWithTitle>
      <CardsWithTitle title="Những chỗ nghỉ nổi bật khuyến nghị cho bạn:">
        <TabBase
          tabData={tabData}
          tabItem={highlightData
            .filter((item) => item.tab === currentTab)
            .map((item: HighlightData) => (
              <CardProduct key={item.id} data={item} />
            ))}
          tabContainerStyle={{
            display: 'flex',
            gap: 30,
            margin: '30px 0px 30px 0px',
            justifyContent: 'center',
          }}
          tabStyle={{
            padding: '0px 0px 10px 0px',
          }}
          tabItemStyle={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
            gap: 32,
          }}
          onHandleChangeTab={setCurrentTab}
        />
      </CardsWithTitle>

      <CardsWithTitle title="Tiếng lành đồn xa">
        {feedBackData.map((item: FeedBackFromTravelers) => (
          <CardFeedBack key={item.id} data={item} />
        ))}
      </CardsWithTitle>
      <CardsWithTitle title="Các điểm đến nổi tiếng ngoài Việt Nam">
        <CustomSlider
          dot={false}
          ItemCard={countryData.map((item: RecommendedDataType) => (
            <CardDestinations key={item.id} data={item} />
          ))}
          numberDisplay={6}
        />
      </CardsWithTitle>
    </div>
  )
}
