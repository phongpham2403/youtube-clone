import React from 'react'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getHomePageVideos } from '../reducers/getHomePageVideos'
import { clearVideos } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { HomePageVideos } from '../types'
import Spinner from './Spinner'

const Home = () => {
    const dispatch = useAppDispatch()
    const videos = useAppSelector((state) => state.youtubeApp.videos)

    useEffect(() => {
        dispatch(getHomePageVideos(false))

        return () => {
            dispatch(clearVideos())
        }
    }, [dispatch])

    return (
        <div className="max-h-screen overflow-hidden">
            <div className="h-[calc(9vh)]">
                <Navbar />
            </div>
            <div className="flex h-[calc(92.5vh)]">
                <Sidebar />
                {videos.length ? (
                    <InfiniteScroll
                        dataLength={videos.length}
                        next={() => dispatch(getHomePageVideos(true))}
                        hasMore={videos.length < 500}
                        loader={<Spinner />}
                        height={650}
                    >
                        <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                            {videos.map((item: HomePageVideos) => (
                                <Card data={item} key={item.videoId} />
                            ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    )
}

export default Home
