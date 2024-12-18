import { StoryChapter } from '../../types/story';

export const storyChapters: StoryChapter[] = [
	{
		id: 2,
		title: "Chapter 1: Ceres",
		"nodes": [
			{
				type: "gallery",
				duration: 136000,
				media: {
					"images": [
						{
							src: "introFloatingZ1",
							"caption": "You wake to find yourself afloat in space. You drift in and out of consciousness. Your mind feels far away. Your thoughts scatter like the solar wind, as insubstantial as the void around you.",
							"displayDuration": 2400,
							"transitionDuration": 500
						},
						{
							src: "introFloatingZ2",
							"caption": "Your ship hovers nearby, broken far beyond repair, a hole smashed clear through where the airlock was. The other side of the vessel is gone. Everything hurts. You wonder how long you’ve been here. You can’t remember.",
							"displayDuration": 2400,
							"transitionDuration": 500
						},
						{
							src: "introFloatingZ3",
							"caption": "You try and think what happened. Nothing comes to mind. It probably doesn’t matter much. The gentle, urgent beeping, fading as your brain starts to falter is an oxygen alarm. It won’t be long now.",
							"displayDuration": 2400,
							"transitionDuration": 500
						},
						{
							src: "introFloatingZ4",
							"caption": "You wonder if it’ll hurt, as your thoughts fall apart. Your eyes close, and you start to drift away. It’ll be a peaceful end at least...",
							"displayDuration": 2400,
							"transitionDuration": 500
						},
						{
							src: "black",
							"caption": "",
							"displayDuration": 1600,
							"transitionDuration": 500
						}
					],
					"music": {
						"track": "marooned",
						"volume": 75
					}
				}
			},
			{
				type: "paragraph",
				text: "You awaken slowly, your mind shrouded in a foggy haze. The dull ache in your head pulsates with each beat of your heart, a relentless reminder of an ordeal you’ve endured. As your consciousness begins to pierce through the darkness, you find yourself in a cramped, dimly lit room. The walls are covered in control surfaces, panels, cables. Blinking lights from some of them cast eerie shadows across the room. You close them again almost instantly. The light hurts.",
				media: {
					"image": {
						src: "prospector"
					},
					"music": {
						"track": "lostInStatic",
						"volume": 25
					}
				}
			},
			{
				type: "paragraph",
				text: "Struggling to push yourself up, you realise your body feels heavy, sluggish. You instinctively know it’s been through some kind of trauma. Panic sets in as you try to recall how you ended up here, but your memory is a jumbled mess, fragmented pieces of a puzzle that refuse to fit together."
			},
			{
				type: "paragraph",
				text: "You try and remember… something. Anything. Nothing comes to mind. A rising panic sets in as you realise you can’t remember how you got here. Or where here is. Or who you are. Or your name. It’s as though your mind is a building, full of corridors and rooms containing your past, but you’re stuck in the hall and can’t get out. The feel adrift in a sea of uncertainty."
			},
			{
				type: "choice",
				id: "talkSleepStand",
				text: "You blink a few times and try jogging your memory again. Nothing comes. You see a man in front of you, sat in an old, battered chair. He’s reading something. Workers clothes. Designed for someone with a hard life, and a hard job. Your head is pounding. You look around at the room. It’s quiet in here. There’s a gentle hum in the background.",
				options: [
					{ picked: 1, text: "Try and sleep" },
					{ picked: 2, text: "Talk to the man" },
					{ picked: 3, text: "Try and stand" }
				],
				media: {
					character: {
						cast: "tertiary",
						name: "Abdullahi",
						src: "abdullahi"
					}
				}
			},
			{
				type: "paragraph",
				text: "You try and close your eyes and go back to sleep, but your head swims as you do. It’s worse than having your eyes open. Whatever happened, it hurts. You shake your head, which the man sees from the corner of his eye.",
				requirements: [{ type: "choice", choiceID: "talkSleepStand", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "You try to speak, but your tongue is leaden in your mouth. What comes out is a muffled garble of half-words. Whatever happened, it’s not good. You shake your head, which the man sees from the corner of his eye.",
				requirements: [{ type: "choice", choiceID: "talkSleepStand", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "You try and stand up, but everything hurts. You don’t keep trying, but instead go back to letting yourself float a little, the meagre gravity of the drive acceleration pulling you back down. You gently shake your head to try and clear the fog, which the man sees from the corner of his eye.",
				requirements: [{ type: "choice", choiceID: "talkSleepStand", optionID: 3 }]
			},
			{
				type: "paragraph",
				text: "The man looks up from his datapad, his eyes meeting yours with a mix of curiosity and wariness. “You’re finally awake,” he says, his voice gruff, echoing slightly in the small space. “Took a nasty hit to the head during the last rock burst. Name’s Ekon Abdullahi, Captain of our little rock-smasher. What happened out there?”"
			},
			{
				type: "paragraph",
				text: "You nod, trying to process the information, but it’s like trying to catch smoke with your hands. “I don’t… I can’t remember,” you manage to say, your voice sounding foreign to your ears."
			},
			{
				type: "paragraph",
				text: "Abdullahi frowns, setting the datapad aside. “Memory loss? That’s not good, but it’s not unheard of with an accident as bad as yours must have been. We think you were near to a mining charge that went off. I’m afraid whatever your ship was was nothing much more than fragments by the time we found you. You’re lucky - only had a few minutes of air left when we picked you up.”"
			},
			{
				type: "paragraph",
				text: "He stands up, and you observe his movements. He flows with an easy grace in the low gravity. Despite the fluidity, you know he can’t have spent all his life on ships - he’s got too much muscle. He spends significant time somewhere with gravity. You feel like you should know where that would be, but the details slip from your mind. You know concepts. Ideas. How to talk. But places, names… Your name. They float away."
			},
			{
				type: "choice",
				id: "employer",
				text: "He casts a critical eye over you. “We need to get you to the med bay at Ceres. Maybe they can jolt your memories back. We’ll be there in a few hours. We found a corporate registration on you. It said you work for… Who was it again? Give me a second. I can’t remember if it was the astro-mining company Delomir, the chemicals company Metagene, or that private security company… ParaSecurity.” He checks his pockets for your ident chip and finds it a moment later. He pulls out the small credit-card sized tablet. “Ah yes, it was…”",
				options: [
					{ picked: 1, text: "Delomir Industries" },
					{ picked: 2, text: "Metagene Incorporated" },
					{ picked: 3, text: "ParaSecurity Limited" }
				]
			},
			{
				type: "paragraph",
				text: "“Delomir Industries. They’ll have a private hospital for their workers. We’ll take you there, and I’m sure they’ll look after you.” You roll the name around your mind. Delomir Industries. It doesn’t trigger anything. “Anyway,” he continues, “we’ll be there in about two days.” Abdullahi gestures towards the door. “Come on. You should meet the rest of the crew. And get something to eat. It might help with the dizziness.”",
				requirements: [{ type: "choice", choiceID: "employer", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“Metagene Incorporated. They’ll have a private hospital for their workers. We’ll take you there, and I’m sure they’ll look after you.” You roll the name around your mind. Metagene Incorporated. It doesn’t trigger anything. “Anyway,” he continues, “we’ll be there in about two days.” Abdullahi gestures towards the door. “Come on. You should meet the rest of the crew. And get something to eat. It might help with the dizziness.”",
				requirements: [{ type: "choice", choiceID: "employer", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "“ParaSecurity Limited. They’ll have a private hospital for their workers. We’ll take you there, and I’m sure they’ll look after you.” You roll the name around your mind. ParaSecurity Limited. It doesn’t trigger anything. “Anyway,” he continues, “we’ll be there in about two days.” Abdullahi gestures towards the door. “Come on. You should meet the rest of the crew. And get something to eat. It might help with the dizziness.”",
				requirements: [{ type: "choice", choiceID: "employer", optionID: 3 }]
			},
			{
				type: "paragraph",
				text: "You stand, legs shaky but holding, and follow him out into the narrow corridor of the ship. The walls are lined with pipes and conduits, the air filled with the constant thrum of the engines. Abdullahi leads you to a small mess hall where a few crew members are gathered around a metal table, eating and chatting."
			},
			{
				type: "paragraph",
				text: "“We have a visitor,” Abdullahi announces. They’re going to be with us until we reach Ceres.”"
			},
			{
				type: "paragraph",
				text: "The crew members look up, their expressions ranging from curiosity to mild indifference. A dark-skinned man with a broad smile and an easygoing manner is the first to speak. “Welcome aboard. I’m Miles, the pilot.”"
			},
			{
				type: "paragraph",
				text: "Next to him, a woman with a sharp gaze and a tool belt slung over her shoulder nods. “Tess, ship’s mechanic. If you need anything fixed, I’m your gal.”"
			},
			{
				type: "paragraph",
				text: "A stern-looking woman with an air of authority gives you a brief nod. “Zig, first mate. Abdullahi and I go way back - he’s good people. You’re in safe hands.”"
			},
			{
				type: "choice",
				id: "foodOrLearn",
				text: "At the end of the table, a lanky young man with an infectious grin waves. “Leo, navigator and resident clown so I’m told. Don’t worry, we’ll get you sorted out.”",
				options: [
					{ picked: 1, text: "Ask for food." },
					{ picked: 2, text: "Ask to learn more about the cew." },
				]
			},
			{
				type: "paragraph",
				text: "“Is there any chance I could get something to eat?”",
				requirements: [{ type: "choice", choiceID: "foodOrLearn", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "A bowl of rehydrated stew is placed in front of you as you sit down, and though you’re not particularly hungry, you take a tentative bite. The warmth of the food helps ground you, offering a small comfort in the midst of your confusion. As you eat, you listen to the crew’s conversation, trying to piece together the reality you’ve been thrust into. They talk about the mining operations on Ceres, ongoing tensions with rival factions, and the ever-present danger of piracy. It’s a harsh, unforgiving world, but there’s a camaraderie among the crew that tempers the bleakness.",
				requirements: [{ type: "choice", choiceID: "foodOrLearn", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“So, how did you all end up on this ship?”",
				requirements: [{ type: "choice", choiceID: "foodOrLearn", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "The crew take turns answering, and you unwind listening to their responses, trying to piece together the reality you’ve been thrust into. They talk about meeting each other in different mining operations on Ceres, the ongoing tensions and histories with rival factions, and the ever-present danger of piracy. It’s a harsh, unforgiving world, but there’s a camaraderie among the crew that tempers the bleakness.",
				requirements: [{ type: "choice", choiceID: "foodOrLearn", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "Abdullahi watches you quietly, his gaze thoughtful. “You look tired,” he says afterwards. “Ceres is a big place, but someone there might know who you are. In the meantime, you should get some rest.”"
			},
			{
				type: "choice",
				id: "askOrThank",
				text: "You feel tired, but don’t want to appear ungrateful.",
				options: [
					{ picked: 1, text: "Ask if you can help." },
					{ picked: 2, text: "Thank Abdullahi and follow him." },
				]
			},
			{
				type: "paragraph",
				text: "“Is there anything I can do to help around here until we reach Ceres?”",
				requirements: [{ type: "choice", choiceID: "askOrThank", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "Abdullahi raises an eyebrow, then nods. “There’s always something to do. We’ll find you something to keep you busy.”",
				requirements: [{ type: "choice", choiceID: "askOrThank", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“Thanks, Abdullahi. I appreciate everything.”",
				requirements: [{ type: "choice", choiceID: "askOrThank", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "The crew’s chatter provides a soothing background as you try to shepherd your fragmented thoughts. Rest sounds good. You feel at sea, not knowing who you are, but for now, you’re among people who seem willing to help.",
				requirements: [{ type: "choice", choiceID: "askOrThank", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "Abdullahi gestures for you to follow him out of the mess hall. He leads you through a series of narrow corridors, each turn and junction revealing more of the ship’s inner workings."
			},
			{
				type: "choice",
				id: "capabilitiesOrMissions",
				text: "As you walk, Abdullahi points out various sections of the ship—the cargo hold, the engine room, and the small but functional medical bay. It’s a small ship, clearly built for utility rather than comfort. A workhorse, designed to endure harsh conditions, everything stripped back to the essentials for its work.",
				options: [
					{ picked: 1, text: "Ask about the ship’s capabilities." },
					{ picked: 2, text: "Inquire about the ship’s recent missions." },
				]
			},
			{
				type: "paragraph",
				text: "“What kind of capabilities does the Prospector have?”",
				requirements: [{ type: "choice", choiceID: "capabilitiesOrMissions", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "Abdullahi smiles slightly. “She’s not the fastest ship out there, but she’s sturdy. Good cargo space, reliable engines, and a decent array of tools for mining operations. She gets the job done. Good thing too…” His eyes glaze over for a moment, his mind elsewhere. “Something is changing out here. There’s something coming.”",
				requirements: [{ type: "choice", choiceID: "capabilitiesOrMissions", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“What kind of missions has the Prospector been on recently?”",
				requirements: [{ type: "choice", choiceID: "capabilitiesOrMissions", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "Abdullahi’s expression turns serious. “We’ve been running a lot of supply missions between the Belt and the inner planets. Mostly routine, but things have been getting tense out here. There’s something coming.”",
				requirements: [{ type: "choice", choiceID: "capabilitiesOrMissions", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "You eventually arrive at a small cabin. It’s sparse but clean, with a single bed, a small desk, and a locker for personal belongings. “This will be your quarters for the duration of the trip,” Abdullahi says. “It’s not much, but it’s yours whilst you’re here.”"
			},
			{
				type: "paragraph",
				text: "“Thanks. I appreciate it,” you reply. You step into the cabin and close the door behind you, taking a moment to look around. The simplicity of the space is comforting. You sit on the bed, your mind racing in the quiet, but looking out the small porthole into the great void beyond brings a calm. Slowly, they beginning to settle."
			},
			{
				type: "paragraph",
				text: "You ache everywhere, and as you lay back on the bed, you fold into yourself as your body finds the sleep it needs."
			},
			{
				type: "choice",
				id: "shareOrDeflect",
				text: "Several hours later, you wake and find that most of the rest of the crew have gone to bed. Day and night doesn’t mean much around here, and somehow you know that there always needs to be someone awake. You make your way through the ship and find yourself back in the mess hall, where Miles is lounging with a mug of coffee. He looks up as you enter and waves you over. “Hey. How’s our guest holding up?”",
				options: [
					{ picked: 1, text: "Share your thoughts with Miles." },
					{ picked: 2, text: "Ask Miles about himself." },
				]
			},
			{
				type: "paragraph",
				text: "“I’m… unsettled. It’s a mix of scared and curious. I need to know who I am, but what if I don’t like what I find? Is this a chance for a new start I should be grateful for and not ask too many questions about? Or should I dig and see what’s out there?”",
				requirements: [{ type: "choice", choiceID: "shareOrDeflect", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "Miles nods sympathetically. “I can’t imagine what you’re going through. But you’re safe here. We’ll help you figure things out.”",
				requirements: [{ type: "choice", choiceID: "shareOrDeflect", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“I’m holding up. So, how did you end up as a pilot on the Prospector?”",
				requirements: [{ type: "choice", choiceID: "shareOrDeflect", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "Miles grins. “Long story, but the short version I’ve always had a knack for flying, and the Captain gave me a chance when I needed it. I owe him.”",
				requirements: [{ type: "choice", choiceID: "shareOrDeflect", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "As you talk with Miles, you start to feel a bit more at ease. His camaraderie is infectious, and despite the uncertainty of your situation, you feel a sense of belonging.",
				requirements: [{ type: "choice", choiceID: "shareOrDeflect", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "The days pass in a blur of routine tasks and conversations with the crew. You learn more about the lives of those around you. Their stories are a tapestry of hope, ambition, and occasional desperation and tragedy. You listen intently, absorbing every detail, searching for a spark that might ignite you own memories. They remain elusive however, but even so, the fractured, fragmented pieces of your new reality begin to fit into some sort of order. It makes you think of a stained glass window built from fragments of something shattered glass. None of it what it was, but still something whole, which can fit together for now."
			},
			{
				type: "paragraph",
				text: "A sound pings through the cabin one evening. Miles has sent you something to read, and the small tablet next to your bed glows softly, asking for your attention. The message attached says “Some of the news I’ve been reading over the last few days. Thought something might jog a memory. Hope it helps. Miles.”"
			},
			{
				type: "paragraph",
				text: "It’s a dry read, detailing technological advancements and economic booms, information about giant corporations. Metagene, Delomir, others… More names which feel like they matter but don’t fit together. Nothing comes, but you’re thankful for the thought. You send a reply, and switch the terminal off again."
			},
			{
				type: "paragraph",
				text: "Three days later, Abdullahi calls a meeting in the mess hall. The crew gathers around the table, and he pulls up a map of the local area. You see dozens, maybe hundreds of ships, yellow dots floating in the space above the table. You see the Prospector, marked in green, and the giant asteroid nation of Ceres."
			},
			{
				type: "paragraph",
				text: "“We’re approaching the docking pattern at Ceres,” he announces. You notice a spiralling pattern to the dots, as they funnel in. The structure begins to coalesce into making some sort of sense. There’s a familiarity to this. “Once we land, we’ll start looking for any leads on our new friend’s identity. Keep your eyes and ears open. We’ll be docked for 12 hours whilst they unload. We have that lot to see if we can help, before we need to get back out to the next rock.”"
			},
			{
				type: "paragraph",
				text: "The crew nods. As the meeting breaks up, Zoe approaches you. “Stick close to us when we land,” she advises. “Ceres can be a rough place. Given your particular situation, let’s not make things harder than they need to be.”"
			},
			{
				type: "paragraph",
				text: "You thank Zoe, and the rest of the crew, before making your way back to your room."
			},
			{
				type: "gallery",
				duration: 237000,
				media: {
					"images": [
						{
							src: "ceresZ4",
							"displayDuration": 45000,
							"transitionDuration": 5000
						},
						{
							src: "ceresZ3",
							"displayDuration": 45000,
							"transitionDuration": 5000
						},
						{
							src: "ceresZ2",
							"displayDuration": 45000,
							"transitionDuration": 5000
							},
						{
							src: "ceresZ1",
							"displayDuration": 90000,
							"transitionDuration": 5000
						}
					],
					"music": {
						"track": "ceres",
						"volume": 100
					}
				}
			},
			{
				type: "paragraph",
				text: "As you gaze out of the window, the vast bulk of Ceres slowly appears. It’s not much more than a featureless dot from this distance.",
				media: {
					"music": {
						"track": "lostInStatic",
						"volume": 25
					},
					"image": {
						src: "ceresMarket"
					}
				}
			},
			{
				type: "paragraph",
				text: "Just another rock in the void from the outside, but inside you know it’s a labyrinth of metal and machinery, alive with the energy of millions of souls, all striving to capture their own piece of the asteroid belt."
			},
			{
				type: "paragraph",
				text: "Images flicker in your mind. Miners, engineers, traders. A blur of faces and voices that you feel you should know, but don’t. You watch as it gets larger over the next few hours, until you can see the vast docking caverns loom into view."
			},
			{
				type: "paragraph",
				text: "You leave your room and make your way to the mess for a final meal as the ship spirals down. You watch the dots above the table slowly move, wondering what each ship is, and who else is watching them out in the void. The ship touches down presently, with a slight shudder. You feel the landing gear lock in against the docking arms. The drive of the ship has created its own gravity, but now with no thrust, you float. As your weight disappears, your mind is quiet for a moment.",
			},
			{
				type: "paragraph",
				text: "A high-speed transport pod meets you at the doors of the ship, and whisks your group away towards the central hub of Ceres. You find yourself inside the heart of the asteroid-city. It’s a maze of spinning surfaces, using gryoscopic forces to create gravity. You see rings and half spheres and hollowed out shapes all spin in different directions, all connected by gimbled walkways. Buildings on the outside of another larger sphere rotate around you too. The effect is disorientating and magical and slightly terrifying. You give up trying to make sense of it."
			},
			{
				type: "choice",
				id: "stayOrAlone",
				text: "You move your gaze back to the faces around you; once strange but now familiar comfort in this place. The pod comes to a halt, and Abdullahi and Zoe lead the way as the crew disembarks. Each person begins going about their tasks with practiced efficiency. Their sense of purpose reminds you of your lack of one. It jars you back into action. You need to learn more.",
				options: [
					{ picked: 1, text: "Stay with the crew." },
					{ picked: 2, text: "Explore on your own." },
				]
			},
			{
				type: "paragraph",
				text: "You stick close to the crew, following Abdullahi and Zoe through the crowd to a market. The noise and activity and motion are almost overwhelming. Abdullahi leads you to a small office near the docks.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }],
				media: {
					"image": {
						src: "garrett"
					}
				}
			},
			{
				type: "paragraph",
				text: "Inside it’s chaotic yet oddly organised space, a small room that seems to burst at the seams with technology. The walls are lined with shelves, each one crammed with data pads, old-fashioned books, and various pieces of equipment. The shelves themselves are a patchwork of different materials, some metal, some wood, all bearing the marks of heavy use and hasty repair.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "In the center of the room, a large, cluttered desk dominates the space. It’s covered in a mess of data pads, holo-displays, and a few old-style paper notebooks filled with scribbled notes and sketches. A multi-screen setup sits on the desk, each screen displaying different streams of data: news from the Belt, ship movements, market prices, and a running list of recent arrivals and departures from Ceres.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "The air is filled with a low hum of electronic equipment, punctuated by the occasional beep or chirp from one of the many devices strewn about. A single, flickering fluorescent light hangs from the ceiling, casting a harsh, uneven glow over the room.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "A figure sits on a chair facing the far wall of the room. “Ah it is you,” he says, without turning around. “What is it you are wanting today Captain Abdullahi”.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "Abdullahi nods in your direction. “This one was found on the drift. We want to find out where they belong. We have the corporate ID, but nothing personal. I was thinking you might know something.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "Garrett nods, tapping a few keys on his console. “I’ll run a search through the newer arrivals and missing persons. It might take a while, but I’ll let you know if I find anything.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "You nod and take a seat, watching as Garrett works. The glowing screens around the office offer a glimpse into life on Ceres, every bit as chaotic as the room you’re in. You catch fragments of stories across the asteroid as they flicker by. You wonder how Garrett can possibly absorb it all.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "After a while, he spins a screen around. “I am thinkings this is you,” he says. You look at the screen. You have an answer to who you are. You’re a security contractor. You worked solo on a small ship, the Celerity. You were reported missing a day ago, when you missed your scheduled check in with the company.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“Although it is saying you were working under a private contract on behalf of your employer. I am feeling sorry to be telling you but they are not now employing you anymore. This ident chip is expired. You is finding yourself unemployed now I am thinkings. However… yes, you is having a bank account with Stertus Bank. You might be having enough to get yourself going again with the insurances for your ship. I am wishing you luck.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "You thank Captain Abdullahi for his help. “No worries,” he replies. “Spacers have to look out for each other. Now I’m afraid, I have to be going. The others will need me. I wish you well, and you’re welcome on the Prospector any time.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 1 }],
				media: {
					"image": {
						src: "ceresMarket"
					},
					character: {
						cast: "primary",
						src: null
					}
				}
			},
			{
				type: "paragraph",
				text: "You wave a final goodbye to the crew as you head off. As you head into the market and weave through the endless shoppers and stalls and vendors, you’re assaulted by the smells of cooking and leather goods and plants and oils. You browse stalls selling everything from mining equipment to exotic ingredients to electrical supplies to ships. There’s even a stall selling antique books.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }],
				media: {
					character: {
						cast: "primary",
						src: null
					}
				}
			},
			{
				type: "choice",
				id: "recogniseOrHub",
				text: "You stop at a small kiosk where an elderly woman is hawking handmade trinkets. She looks up at you with a curious expression. “You look lost, dear. Looking for something?”",
				options: [
					{ picked: 1, text: "Ask if she recognises you." },
					{ picked: 2, text: "Ask for directions to an information hub." },
				],
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "“Actually, I am a bit lost. I know this is an odd question, but you happen to recognise me?”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }, { type: "choice", choiceID: 8, optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "The woman squints at you, then shakes her head. “Can’t say I do, but if it’s information you’re looking for, you might want to try going to Garrett’s place. They keep records of everyone who comes through here.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }, { type: "choice", choiceID: 8, optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“Could you point me to the nearest information vendor?”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }, { type: "choice", choiceID: 8, optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "The woman nods, pointing down a narrow alley. “Just down that way, then take a left. Garrett’s the one you want. You’ll see the sign.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "You find the office relatively easily. As you open the door and walk inside, you find yourself in a chaotic yet oddly organised space. It’s a small room that seems to burst at the seams with technology. The walls are lined with shelves, each one crammed with data pads, old-fashioned books, and various pieces of equipment. The shelves themselves are a patchwork of different materials, some metal, some wood, all bearing the marks of heavy use and hasty repair.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }],
				media: {
					"image": {
						src: "garrett"
					}
				}
			},
			{
				type: "paragraph",
				text: "In the centre of the room, a large, cluttered desk dominates the space. It’s covered in a mess of data pads, holo-displays, and a few old-style paper notebooks filled with scribbled notes and sketches. A multi-screen setup sits on the desk, each screen displaying different streams of data: news from the Belt, ship movements, market prices, and a running list of recent arrivals and departures from Ceres.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "The air is filled with a low hum of electronic equipment, punctuated by the occasional beep or chirp from one of the many devices strewn about. A single, flickering fluorescent light hangs from the ceiling, casting a harsh, uneven glow over the room.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "A figure sits on a chair facing the far wall of the room. “Ah hello there my friend,” he says, without turning around. “What is it you are wanting today from Garrett’s emporium of information?”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "choice",
				id: "explainOrCouch",
				text: "You wonder for a moment how to explain your situation, and how much you should reveal.”",
				options: [
					{ picked: 1, text: "Explain and ask for help finding your identity." },
					{ picked: 2, text: "Ask information about recent arrivals and missing persons." },
				],
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "“I’m trying to find out who I am. I was found in a damaged shuttle with no ID or memory.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }, { type: "choice", choiceID: "explainOrCouch", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "Garrett’s smile fades into a look of concern. “That is sounding serious. Let’s us see what we can be finding. I’ll need to be knowing any details you know. Anything, no matter how smallies it might seem might be helping of you.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }, { type: "choice", choiceID: "explainOrCouch", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "“I’m looking for information about recent arrivals in the past few days. Specifically, anyone found in a damaged shuttle, or lost ships.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }, { type: "choice", choiceID: "explainOrCouch", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "Garrett’s smile fades into a look of concern. “That is serious matters. Let’s us see what we can be finding. I’ll need to be knowing any details you know of the vessel you are being looking for knowings about.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }, { type: "choice", choiceID: "explainOrCouch", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "You tell him what you can, and then sit back and wait patiently whilst he works.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "After a while, he spins a screen around. “I am thinkings this is you,” he says. You look at the screen. You have an answer to who you are. You’re a security contractor. You worked solo on a small ship, the Celerity. You were reported missing a day ago, when you missed your scheduled check in with the company.",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "“Although it is saying you were working under a private contract on behalf of your employer. I am feeling sorry to be telling you but they are not now employing you anymore. This ident chip is expired. You is finding yourself unemployed now I am thinkings. However… yes, you is having a bank account with Stertus Bank. You might be having enough to get yourself going again with the insurances for your ship. Take this,” he says, and passes you a new ident chip. “This is coded to your palm print and DNA. It will be letting you have access to any systems and accounts you will be needing. Now I must be getting on I am afraid. I am wishing you luck.”",
				requirements: [{ type: "choice", choiceID: "stayOrAlone", optionID: 2 }],
				media: {
					"image": {
						src: "ceresMarket"
					}
				}
			},
			{
				type: "paragraph",
				text: "You feel a mix of relief and uncertainty. You know who you worked for. You’re in private security, most recently contracted by Delomir Industries.",
				requirements: [{ type: "choice", choiceID: "employer", optionID: 1 }]
			},
			{
				type: "paragraph",
				text: "You feel a mix of relief and uncertainty. You know who you worked for. You’re in private security, most recently contracted by Metagene Incorporated.",
				requirements: [{ type: "choice", choiceID: "employer", optionID: 2 }]
			},
			{
				type: "paragraph",
				text: "You feel a mix of relief and uncertainty. You know who you worked for. You’re in private security, most recently contracted by ParaSecurity Limited.",
				requirements: [{ type: "choice", choiceID: "employer", optionID: 3 }]
			},
			{
				type: "paragraph",
				text: "As you walk through the bustling streets, the sheer scale of the asteroid city overwhelms you. People from all walks of life hurry past, each with their own purpose. People in suits, people in rags, people with augmentations… All life is here. You feel a pang of isolation amidst the crowd."
			},
			{
				type: "choice",
				id: "apologiseOrContinue",
				text: "Lost in thought, you almost collide with a woman carrying a stack of supplies. She staggers for a moment, but manages to keep her balance. “Watch it!”, she snaps, her voice laced with irritation.",
				options: [
					{ picked: 1, text: "Apologise and offer to help." },
					{ picked: 2, text: "Brush it off and keep walking." }
				]
			},
			{
				type: "paragraph",
				text: "You quickly reach out to steady her. “I’m so sorry! Let me help you with those”.",
				requirements: [{ type: "choice", choiceID: "apologiseOrContinue", "optionID": 1 }],
				media: {
					character: {
						cast: "primary",
						name: "Mara",
						src: "mara"
					}
				}
			},
			{
				type: "paragraph",
				text: "The woman gives you a scrutinising look, her irritation fading into curiosity. “Thanks… I guess I was a bit harsh. I’m Mara.” She extended a hand, whilst passing some of the load to you.",
				requirements: [{ type: "choice", choiceID: "apologiseOrContinue", "optionID": 1 }]
			},
			{
				type: "paragraph",
				text: "You shrug it off and kept walking, your mind too lost in your own thoughts to deal with another person’s problems.",
				requirements: [{ type: "choice", choiceID: "apologiseOrContinue", "optionID": 2 }]
			},
			{
				type: "paragraph",
				text: "You ignore the woman’s look of annoyance and go take another step, but a feeling passes over you and makes you stop. There’s something familiar about her. You turn back, trying to place her in your memory. “Wait… I’m sorry. That was rude of me. It’s not been a good few days. Can I help?”",
				requirements: [{ type: "choice", choiceID: "apologiseOrContinue", "optionID": 2 }],
				media: {
					character: {
						cast: "primary",
						name: "Mara",
						src: "mara"
					}
				}
			},
			{
				type: "paragraph",
				text: "The woman gives you a scrutinising look, her irritation fading into curiosity. “Thanks… I guess I was a bit harsh too. I’m Mara.” She extended a hand, whilst passing some of the load to you.",
				requirements: [{ type: "choice", choiceID: "apologiseOrContinue", "optionID": 2 }]
			},
			{
				type: "paragraph",
				text: "Mara smiles. “Nice to meet you.” She pauses for a moment, as if taking in your appearance properly for the first time. “You seem lost. Need help finding your way somewhere?”",
			},
			{
				type: "paragraph",
				text: "“Actually, yes, I could use some help. I’m looking for Stertus Bank. I don’t suppose you’d happen to know where it is?”",
			},
			{
				type: "paragraph",
				text: "She smiles. “Help me drop these off at the office, and I’ll take you there.”",
			},
			{
				type: "paragraph",
				text: "You talk as she leads you to her office. She’s a former military pilot, now working freelance. She flies a small ship with a crew of three for those who will pay. When she’s on Ceres and they’re looking for their next contract, she works in the local administration office, helping newcomers and those in need on Ceres. “There’s always plenty of both, but we never have to wait long for the next contract. There will always be people who need a good ship with a good crew.”",
			},
			{
				type: "paragraph",
				text: "“How did you end up in administration?” you ask, curious as to how someone with a combat pilot’s skillset ended up working as a clerk.",
			},
			{
				type: "paragraph",
				text: "Mara’s expression turns thoughtful. “I joined the military straight out of school. Served for 12 years, and went everywhere. All over Earth, missions on Mars and Titan. I was at the Skeldan uprising. Eventually I got asked to run protection for a shipping line after I mustered out. The pay was good. It could have been a good gig. But after everything I’d done, all the things I’d seen? I wanted to use my skills to help people. Combat pilots don’t get to make a lot of friends. Ceres seemed like a place where I could make a difference, and start fresh.”",
				requirements: [{ type: "choice", "choiceID": 6, "optionID": 1 }]
			},
			{
				type: "paragraph",
				text: "“Did it work?”"
			},
			{
				type: "paragraph",
				text: "Mara nods. “I’m still here, so something stuck.” You both arrive outside the office for the Department for Administrative Affairs. She leads you through the doors, her key card granting you both access. You deliver the files you’ve been carrying to a weary-looking gentleman, who nods with the kind of reflex response that says he’s not really paying attention.",
			},
			{
				type: "paragraph",
				text: "Mara turns back to you. “Thanks for the help. Now then, it was Stertus Bank you wanted, right?” You reply as she leads you back out, and you both start heading towards the bank.",
			},
			{
				type: "paragraph",
				text: "Mara turns back to you. “Thanks for the help. Now then, it was Stertus Bank you wanted, right?” You nod. “No worries. Follow me.”",
			},
			{
				type: "paragraph",
				text: "She leads you through the streets to a transport pod. It whisks you both away, and a minute later, you’re standing in the financial district. Everything here smells of money. Everything looks clean and lush, a testament to what enough financial resource can do to a place. Even one built in a cave in a rock in space. There are even plants here, not growing for their oxygen generation or air filtration properties, but just because they’re beautiful. In its own way, its terrifying.",
			},
			{
				type: "choice",
				id: "maraFollowOrStay",
				text: "She leads you through the streets to a transport pod. It whisks you both away, and a minute later, you’re standing in the financial district. Everything here smells of money. Everything looks clean and lush, a testament to what enough financial resource can do to a place. Even one built in a cave in a rock in space. There are even plants here, not growing for their oxygen generation or air filtration properties, but just because they’re beautiful. In its own way, its terrifying.",
				options: [
					{ picked: 1, text: "Ask Mara to come in." },
					{ picked: 2, text: "Ask Mara to wait." }
				]
			},
			{
				type: "paragraph",
				text: "She smiles. “Hey, no worries.” She looks at you, understanding there’s more to this than you’ve shared."
			},
			{
				type: "paragraph",
				text: "You walk in through the revolving door, with Mara following close behind. It’s beautiful inside. Old. You see a row of counters, and a small queue of people lined up. You join the queue, and a minute or two later, you’re standing in front of the bank’s representitive.",
				requirements: [{ type: "choice", choiceID: "maraFollowOrStay", "optionID": 1 }]
			},
			{
				type: "paragraph",
				text: "You walk in through the revolving door, whilst Mara watches from outside. It’s beautiful inside. Old. You see a row of counters, and a small queue of people lined up. You join the queue, and a minute or two later, you’re standing in front of the bank’s representitive.",
				requirements: [{ type: "choice", choiceID: "maraFollowOrStay", "optionID": 2 }]
			},
			{
				type: "paragraph",
				text: "You present your ident chip. A moment passes whilst the system scans it, before the woman behind the counter looks up. “This chip is expired, but valid for an account here. There’s a transfer instruction on it, as well as on some hardware. Please place your hand on the scanner so we can confirm your identity.”"
			},
			{
				type: "paragraph",
				text: "You put your hand on a small glass slab in front of you, and feel a strange tingle as it reads your palm print and does a brief partial scan on your DNA. It makes a soft noise, confirming you are who you say."
			},
			{
				type: "paragraph",
				text: "“The funds have been transferred to your personal ident chip,” she says. The scanner flicks and changes to display your account information. You don’t know much about money, but you know that the number there is big enough to start again. To build a new life. A moment later the hardware transfer completes, and a second item comes up on the screen. Lumo Station. It doesn’t ring any bells, but..."
			},
			{
				type: "paragraph",
				text: "“A space station?” you ask. The woman doesn’t reply immediately, but instead reaches into a drawer in her desk, and then hands you a pack of papers from it. Even upside-down, it’s not hard to read the words Title Deed and Transfer of Ownership."
			},
			{
				type: "paragraph",
				text: "“Just about,” she replies. “The detail is in the pack, but it seems your former employer wanted to say thank you, although not enough to actually give you something functional. There’s a lot of work in restoring it - apparantly it was hit by a micrometeor shower not long ago. Currently it exists as an unmanned wreck, but the funds you have now should be more than enough to get you started in repairing it. I believe this concludes our business. I’ll get the account closed, and thank you for your visit today.”"
			},
			{
				type: "paragraph",
				text: "You wonder at her manner. Curt. Not impolite exactly, but busy, in the way that says this is on the smaller end of what she will deal with today. The ponderance only lasts a second, before the obvious second thought crashes into your mind. You own a space station. Ruined apparantly, but still. Yours."
			},
			{
				type: "paragraph",
				text: "You thank the clerk and head outside, wondering what your next move should be. After a moment, you remember Mara, who you notice is waiting beside you quietly. “I think,” she says cautiously, “you should come meet my employer, Aharon, and my shipmate Grace. I get the feeling there is more to this than you said. It might be that we can help, unless you’ve got other ideas as to what to do next?”"
			},
			{
				type: "paragraph",
				text: "You shake your head. “Not really, no.”"
			},
			{
				type: "paragraph",
				text: "“Come on then. Come and meet Aharon and Grace, and we’ll go from there.”"
			},
			{
				type: "choice",
				id: "mulling",
				text: "You follow Mara back to the transport pod, and it speeds you away. You’re thankful for the peace as it zips along. You wonder what to do. What do you even do with a space station?. You consider your options. You think about:",
				options: [
					{ picked: 1, text: "Astro-mining." },
					{ picked: 2, text: "Security contracting." },
					{ picked: 3, text: "Information brokering." }
				]
			},
			{
				type: "paragraph",
				text: "You find yourself reflecting on your time with the crew of the Prospector. You wonder what will become of the crew. From the time you spent with them, you know astro-mining is a hard life. Out amongst the cold vacuum, hundreds of thousands of miles from the nearest people who aren’t on your crew. It’s a life. You hope they’ll be alright. It might be you could use the station to help people like them. A way-post in the void.",
				requirements: [{ type: "choice", choiceID: "mulling", "optionID": 1 }]
			},
			{
				type: "paragraph",
				text: "You wonder about your former life. You wonder if you were a good person. You suspect people who end up in security contracting probably have an interesting set of skills and a past which enabled them to acquire those skills. It’s not hard to imagine versions of that life which are less than pleasant. Still, a space station gives options. You could set up a security practice there, helping bring safety in the void.",
				requirements: [{ type: "choice", choiceID: "mulling", "optionID": 2 }]
			},
			{
				type: "paragraph",
				text: "You think about Garrett. It’s a strange life he has. Listening to everything, saying little, and only when asked. Dealing in information. You wonder if it’s something you could do. Someone with a background in security consultancy could probably find a path into that life. There will always be a need for someone who knows the answers out in the asteroid belt.",
				requirements: [{ type: "choice", choiceID: "mulling", "optionID": 3 }]
			},
			{
				type: "paragraph",
				text: "You’re brought out of your contemplations by the slowing of the pod. You look outside and see a selection of small ships moored at the docks. They’re not much to look at, each has their own personality. Each has a certain sort of charm to it. Mara points at the third one along."
			},
			{
				type: "paragraph",
				text: "“There she is. The Aeris Vaga. She’s not much to look at, but she’s tough, she’s quick, and she’s reliable. You can’t ask for much more in my opinion.” There’s a look of pride to Mara’s face as she talks. There’s something almost maternal to it. Her eyes glaze over, her thoughts going somewhere else. You wonder what she’s thinking, but don’t question it." 
			},
			{
				type: "paragraph",
				text: "As you board, Mara calls out to Aharon and Grace. Neither answer. “Aeris, locate Aharon and Grace,” she calls out. A woman’s voice answer from all around you. “Hello there Mara. Grace and Aharaon have left to meet a contact. They said they’d be back in about an hour. That was about 45 minutes ago. Would you like me to call them?”" 
			},
			{
				type: "paragraph",
				text: "She tells the ship’s AI not to disturb them, and instead shows you to your quarters. It’s a small cabin, with a bunk and a bathroom. She leaves you to settle in, but before she goes, she sets you up on a terminal. “Dinner will be in half an hour in the mess. You can’t really get lost on Aeris - she’s not that big. Anything you need, I’ll be in the cockpit checking over ship’s systems.”" 
			},
			{

				type: "paragraph",
				text: "You thank her, and as she leaves, you turn on the terminal and wonder what’s next. You scan your ident, and from the menu it presents, you bring up the schematics of Lumo." 
			},
			{

				type: "paragraph",
				text: "It’s a small station - seven bands deep, designed to rotate the inner surface to provide a steady .7G environment. Enough to be comfortable, not so much that it’ll be a problem for spacers. The damage report isn’t as bad as you feared. It'll be costly to get everything up and running again, but you should be able to get to something habitable without spending too much." 
			},
			{

				type: "paragraph",
				text: "A set of communication notifications pop up in the corner of the screen. Different groups offering to fix the damage for you. Each gives a costed quote and a timeframe. You make a note to check back on those later, and settle down for now, turning off the terminal. It’s too much to consider for the moment. You lay back on the bunk, and sleep overtakes you." 
			},
			{
				type: "button",
				text: "Continue…",
				mode: "cards"
			}
		]
	}
]