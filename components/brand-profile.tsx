import { profileSummary, type Article } from "@/lib/content";

export function BrandProfile({ entity }: { entity: Article }) {
  return <section className="profile-card"><span className="eyebrow">Brand Profile</span><h2>{entity.title}</h2><p>{profileSummary(entity.body)}</p>{entity.tags.length ? <div className="profile-tags">{entity.tags.filter(tag=>!['品牌','竞品','品牌地图'].includes(tag)).map(tag=><span key={tag}>{tag}</span>)}</div> : null}</section>;
}
