import { Panel } from '@/components/Panel'
import { profile } from '@/data/skillsData'
import styles from './AboutPanel.module.css'

export function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <Panel eyebrow="02 / Cuaderno" title="Sobre mí" onClose={onClose}>
      <div className={styles.pages}>
        <section className={styles.page} aria-labelledby="bio-heading">
          <p className={styles.folio}>01 / Biografía</p>
          <h3 id="bio-heading">{profile.name}</h3>
          <p>{profile.bio}</p>
          <h4>Trayectoria</h4>
          <ul className={styles.milestones}>
            {profile.milestones.map(({ label, detail }) => (
              <li key={label}><strong>{label}</strong><span>{detail}</span></li>
            ))}
          </ul>
        </section>
        <section className={styles.page} aria-labelledby="skills-heading">
          <p className={styles.folio}>02 / Habilidades</p>
          <h3 id="skills-heading">Herramientas del taller</h3>
          {profile.skills.map(({ category, items }) => (
            <div key={category}>
              <h4>{category}</h4>
              <ul className={styles.skills}>{items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
          ))}
        </section>
      </div>
    </Panel>
  )
}
