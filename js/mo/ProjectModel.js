/**
 * 带收藏状态的item
 * @param {*} showText
 * @param {*} searchText
 */
export default function ProjectModel(item,isFavorite){
    this.item=item;
    this.isFavorite = isFavorite;
}