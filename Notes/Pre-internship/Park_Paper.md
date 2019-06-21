# [Brain somatic mutations in MTOR cause focal cortical dysplasia type II leading to intractable epilepsy](https://www.nature.com/articles/nm.3824?message-global=remove)

### Abstract
- [Focal cortical dysplasia type II (FCDII)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3403799/)
  - malformation of the prefrontal cortex caused when cells in the developing brain fail to migrate to the right place
  - `Clinical symptoms are more severe in type II of cortical dysplasia usually seen in children. In this type, more extensive changes occur outside the temporal lobe with predilection for the frontal lobes.`
  - causes seizures
  - hypothesized to be caused by somatic mutations in the affected cells
- methods
  - for 4 individuals
    - used whole exome/specific site sequencing across paired brain/blood DNA
    - uncovered a new brain somatic mutation in mechanistic target of rapamycin  gene (MTOR) - MTOR is the gene mTOR is the kinase that it codes for
  - for 73 other individuals
    - used deep sequencing and found that 15.6% of these individuals had the same mutation
- mutation causes hyperactivation of mTOR kinase
  - mutant MTOR in mice caused seizures/cytomegalic neurons
  - inhibition of mTOR with rapamycin suppressed seizures/cytomegalic neurons
- first evidence that MTOR mutation causes FCD and mTOR is a treatment target for epilepsy in FCD

### Main
- FCD causes a significant proportion of epilepsy in children
  - surgery cures about 60% of people
  - don't really know the molecular genetic etiology
  - classified by histopathology
- type 2 - disrupted cortical lamination and dysmorphic neurons (balloon cells)
  - because it occurs sporadically - implies that there is a somatic mutation mechanism in the neuronal development/migration genes
  - MRI's look normal but then surgical specimens show that there are abnormal cells surrounded by normal cells
  - hard to sequence using traditional Sanger/whole exome sequencing - pivot to deep WES, hybrid capture, amplicon sequencing of candidate gene
- hypothesis: FCDII associated with brain somatic mutations
  - 4 blood/brain paired samples
    - deep sequencing and then used 2 algorithms
      - Virmid and MuTect algorithms
      - identified 3 main mutations
      - three overlapping MTOR variants: c.4448G>A, c.7255G>A and c.7280T>C
    - performed deep site-specific amplicon sequencing to make sure that there were no sequencing artifacts
    - mutation frequencies found at certain rate in the brain but not in the blood samples
  - 73 additional samples
    - hybrid capture of all exons in MTOR gene/deep site-specific amplicon sequencing at the initial three candidate sites
    - analysis identified further 8 different somatic mutations
    - these mutations were not found in the blood/saliva samples from these individuals
- mutation specifics
  - Cys1483 and Leu2427 sites maintain structural integrity
  - hypothesized that certain mutations lead to mTOR kinase hyperactivation
- check to see if MTOR mutations lead to hyperactive kinase
  - transfected kidney cells with mutated MTOR and saw increased kinase activity
  - dissected fresh brain tissue sections of patients with mutation and saw increase in number of neurons with phosphorylated S6 marker
  - suggests MTOR mutations strongly associated with hyperactivation of mTOR and dysregulation of neuronal growth in patients with FCDII
- check to see if MTOR mutations lead to stunted cortical development
  - eletroporated mouse brain with MTOR mutations
  - 90% of mice with mutant mTOR had spontaneous seizures, some also had larger neurons in affected cortical regions
  - wild-type mTOR didn't have any seizures
  - rapamycin treatment pretty much cured all of the seizures
- both types of FCD (with and without balloon cells are both caused by same genetic etiology)

### Reference
- amplicon: target of replication/amplification
- epilepsy - general condition where brain activity is disrupted, causing seizures
- resection - removal of part of an organ/gland
- whole exome sequencing (WES)
- transient transfection - incorporation of foreign DNA for only a short time
- [SNV calling from NGS](https://en.wikipedia.org/wiki/SNV_calling_from_NGS_data#Methods_for_detecting_germline_variants)
 
# Questions
- purpose of hybrid capture specifically?
- `three overlapping MTOR variants: c.4448G>A, c.7255G>A and c.7280T>C` -> notation meaning
- differences between wild type and mutated proteins/genes