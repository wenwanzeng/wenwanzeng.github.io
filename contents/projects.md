
---
Optoelectronic devices are opening new opportunities for next-generation intelligent systems, including intelligent sensing, neuromorphic computing, and bioelectronic interfaces. Among these applications, artificial neural synapses are particularly important because they aim to mimic the signal transmission and weight modulation functions of biological synapses, providing a material and device basis for neuromorphic information processing.

In a typical artificial synapse, three key processes are involved: presynaptic input, synaptic weight modulation, and postsynaptic output. When optical signals are used as both the input and output, the system can be regarded as an all-photonic synapse. Compared with electrically driven synaptic devices, all-photonic synapses offer the possibility of direct optical communication, low crosstalk, high bandwidth, and light-controlled information processing.

Materials used in all-photonic synapses can be broadly classified into transmittance-based and photoluminescence-based systems. Among photoluminescence-based systems, organic emitters are especially attractive because their photophysical properties can be finely tuned through molecular design, host–guest engineering, and excited-state regulation. They also offer advantages such as solution processability, structural diversity, and potentially low energy consumption.
<img src="/static/assets/img/intro1.png" style="width: 100%; height: auto;" />

My research focuses on organic all-photonic synapses based on triplet-mediated luminescence processes, especially triplet–triplet annihilation and room-temperature phosphorescence. Rather than only describing the observed synaptic behaviors phenomenologically, my work aims to understand how microscopic excited-state kinetics give rise to macroscopic device functions, such as nonlinear optical response, cumulative emission, memory effect, and response linearity.

Through kinetic modeling, analytical derivation, quantum-chemical calculation, and comparison with experimental results, I seek to build a clear connection between material structure, kinetic processes, and synaptic performance. This kinetic perspective provides not only a mechanistic explanation for existing organic all-photonic synapses, but also possible design principles for developing high-performance organic neuromorphic materials.
<img src="/static/assets/img/intro2.png" style="width: 100%; height: auto;" />


### I. Kinetic Origin of Nontraditional Nonlinearity in TTA-Induced Organic All-Photonic Synapses
**Abstract**: Triplet-triplet annihilation is usually associated with a characteristic excitation-power dependence, where the double-logarithmic slope of emission intensity changes from approximately 2 to 1. However, the reported TTA-induced organic all-photonic synapse based on S2OC shows a different nonlinear behavior, with the slope changing from about 1.3 to 1.9. To understand this unusual response, I constructed a series of kinetic models covering different TTA-mediated luminescence pathways, including low-state and high-state emission models, oxygen-involved processes, singlet-oxygen-mediated channels, and triplet-pair pathways. By solving the corresponding rate equations and comparing steady and transient luminescence, I found that the nontraditional nonlinear response cannot be fully explained by steady-state TTA theory. Instead, it originates from unsteady luminescence caused by the transient accumulation and depletion of triplet-mediated excited states. This work provides a kinetic explanation for the nonlinear optical response of TTA-induced organic all-photonic synapses.

**Method**: Kinetic modeling of triplet-triplet annihilation process, supported steady-state spectrum experiments and TDDFT simulations.  
**Results**: \
<img src="/static/assets/img/TTA_model.png" style="width: 100%; height: auto;" />
*Figure 1. Kinetic models constructed to describe possible TTA-mediated luminescence pathways. The models distinguish low-state and high-state emission channels and include different roles of oxygen, singlet oxygen, and triplet-pair states.*

<img src="/static/assets/img/TTA_S2OC.png" style="width: 100%; height: auto;" />
*Figure 2. Comparison between steady-state and unsteady luminescence. The unusual slope change observed in S2OC is reproduced only when transient luminescence is considered, indicating that the nonlinear response originates from time-dependent triplet kinetics.*

---

### II. Mechanism of Cumulative and Memory Effects in TTA-Induced Organic All-Photonic Synapses 
**Abstract**: In 2023, [Chen et al.](https://doi.org/10.1021/jacs.2c13471) reported the first organic all-optical synapse, achieving contactless optical information input and output. Under aerobic conditions, the fluorescence intensity of the organic all-optical synapse reported by them would continuously increase with the duration of excitation light irradiation (accumulative effect), and after a brief interruption of light irradiation, the initial luminescence intensity after re-excitation would be stronger than the previous one (memory effect). 

**Results**: \
<img src="/static/assets/img/cumulative_memory.png" style="width: 100%; height: auto;" />
Figure 1. Stepwise activation of TTA-mediated channels under different excitation strengths. The model explains why cumulative emission appears only above a threshold excitation condition.

<img src="/static/assets/img/Three_step.png" style="width: 100%; height: auto;" />
Figure 2. Proposed three-step mechanism for TTA-induced organic all-photonic synapses: ordinary emission below threshold, TTA-channel activation above threshold, and slow depletion of intermediate states during the dark interval.

---

### III. Kinetic Mechanism and Molecular Design Strategy for RTP-Induced Organic All-Photonic Synapses

**Abstract**: Host–guest room-temperature phosphorescence systems are promising materials for organic all-photonic synapses because their long-lived triplet-related states can store excitation history and generate cumulative emission under repeated or continuous irradiation. However, long phosphorescence lifetime alone is not sufficient to explain synaptic performance, especially the differences in cumulative behavior and response linearity among different host–guest systems. To address this problem, I constructed a kinetic model that introduces charge-transfer and charge-separated intermediate states into the RTP process. These states act as kinetic reservoirs that regulate both long-lived phosphorescence decay and cumulative emission. By solving the rate equations under post-excitation and continuous-wave excitation conditions, I identified the key kinetic requirement for RTP-induced synaptic behavior: moderate CT-to-CS conversion together with slow CS depletion.

Building on this mechanistic understanding, I further connected the kinetic solution with the empirical response-linearity equation used in synaptic devices. The analysis shows that response linearity is governed by specific slow kinetic processes in the host–guest excited-state network. In particular, reducing the rate constant associated with CT-to-local-triplet conversion can improve response linearity more effectively. By combining this kinetic insight with Marcus–Levich-type analysis, I proposed a host–guest energy descriptor that links molecular energetics, kinetic parameters, and synaptic performance. This work establishes a structure–kinetics–property relationship for RTP-induced organic all-photonic synapses and provides a molecular design principle for developing high-performance organic neuromorphic materials.

**Results**: \
<img src="/static/assets/img/CS_model.png" style="width: 100%; height: auto;" />
Figure 1. Host–guest RTP kinetic model involving charge-transfer and charge-separated intermediate states. These states act as kinetic reservoirs that enable long-lived phosphorescence and cumulative emission.


<img src="/static/assets/img/CS_OAPS.png" style="width: 100%; height: auto;" />
Figure 2. Structure–kinetics–property relationship for RTP-induced organic all-photonic synapses. The host–guest energy descriptor regulates key kinetic parameters, which further determine response linearity and synaptic performance.

---
