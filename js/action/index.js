/**
 * Created by Administrator on 2019/10/17.
 */
import {onThemeChange} from './theme'
import {onRefreshPopular,onLoadMorePopular,onFlushPopularFavorite} from './popular'
import {onLoadMoreTrending,onRefreshTrending,onFlushTrendingFavorite} from './trending'
import {onLoadFavoriteData} from './favorite'
import {onLoadLanguage} from './language'
export default {
    onThemeChange,
    onRefreshPopular,
    onLoadMorePopular,
    onLoadMoreTrending,
    onRefreshTrending,
    onLoadFavoriteData,
    onFlushPopularFavorite,
    onFlushTrendingFavorite,
    onLoadLanguage
}