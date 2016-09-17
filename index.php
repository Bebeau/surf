<?php

global $post;

get_header();
	
	echo '<div id="cbp-fbscroller" class="cbp-fbscroller">';

		echo '<nav>';
			echo '<a href="#fbsection1"></a>';
			echo '<a href="#fbsection2"></a>';
			echo '<a href="#fbsection3"></a>';
			echo '<a href="#fbsection4"></a>';
			echo '<a href="#fbsection5"></a>';
			echo '<a href="#fbsection6"></a>';
		echo '</nav>';

		$args = array(
			'post_type' => 'page',
			'post__in'	=> array(2)
		);
		query_posts( $args );
		while ( have_posts() ) : the_post();
			echo '<section id="fbsection1">';
				echo '<div class="outer"><div class="inner">';
					echo '<div class="container">';
						echo '<div class="row">';
							echo '<div class="col-sm-5 col-sm-offset-1">';
								echo '<img class="logo" src="'.get_bloginfo('template_directory').'/assets/images/logo.svg" alt="Surf">';
							echo '</div>';
							echo '<div class="col-sm-4 copy">';
								the_content();
								echo '<div id="download">';
									echo '<a href="https://itunes.apple.com/us/app/surf-live/id1139012413?mt=8" target="_BLANK"><img class="svg" src="'.get_bloginfo('template_directory').'/assets/images/apple_large.svg" alt="Surf"></a>';
									echo '<a href="https://play.google.com/store/apps/details?id=com.surfliveinc.surf&hl=en" target="_BLANK"><img class="svg" src="'.get_bloginfo('template_directory').'/assets/images/android_large.svg" alt="Surf"></a>';
								echo '</div>';
							echo '</div>';
						echo '</div>';
					echo '</div>';
				echo '</div></div>';
			echo '</section>';
		endwhile;
		wp_reset_query();
			
		$args = array(
			'post_type' => 'page',
			'post__in'	=> array(5,7,9),
			'order' => 'ASC'
		);
		query_posts( $args );
		$c = 2;
		while ( have_posts() ) : the_post();
			$banner = get_post_meta($post->ID, 'banner', true);
			$info = new SplFileInfo($banner);
		    $fileType = $info->getExtension();
			echo '<section id="fbsection'.$c.'" class="iphone">';
				if(!empty($banner)) {
					if($fileType === "mp4" || $fileType === "webm" || $fileType === "ogv" || $fileType === "ogg") {
		                echo '<div class="videoWrap">';
			                echo '<video muted autoplay id="bgvid" loop>';
			                    echo '<source src="'.$banner.'" type="video/webm">';
			                    echo '<source src="'.$banner.'" type="video/ogv">';
			                    echo '<source src="'.$banner.'" type="video/mp4">';
			                echo '</video>';
			            echo '</div>';
			        } else { 
			        	echo '<div class="image" style="background-image: url('.$banner.');"></div>';
			       }
				}
				echo '<div class="outer"><div class="inner">';
					echo '<div class="container">';
						echo '<div class="row">';
							echo '<div class="col-sm-4" data-animation="slideUp">';
								echo '<div class="outer"><div class="inner">';
									the_title("<h2 data-animation='slideUp'>","</h2>");
								echo '</div></div>';
							echo '</div>';
							echo '<div class="col-sm-4 col-sm-offset-4">';
								echo '<div class="outer"><div class="inner">';
									the_content();
								echo '</div></div>';
							echo '</div>';
						echo '</div>';
					echo '</div>';
				echo '</div>';
			echo '</section>';
			$c++;
		endwhile;
		wp_reset_query();

		echo '<section id="fbsection5">';
			echo '<div class="outer"><div class="inner">';
				echo '<h2>Get Connected</h2>';
				if( get_option('facebook') || get_option('twitter') || get_option('instagram') || get_option('pinterest') || get_option('youtube') ) { ?>
					<div class="socialWrap">
						<?php if( get_option('facebook')) { ?>
							<a class="facebook" href="<?php echo get_option('facebook'); ?>" target="_blank">
								<i class="fa fa-facebook"></i>
							</a>
						<?php } ?>
						<?php if( get_option('twitter')) { ?>
							<a class="twitter" href="<?php echo get_option('twitter'); ?>" target="_blank">
								<i class="fa fa-twitter"></i>
							</a>
						<?php } ?>
						<?php if( get_option('instagram')) { ?>
							<a class="instagram" href="<?php echo get_option('instagram'); ?>" target="_blank">
								<i class="fa fa-instagram"></i>
							</a>
						<?php } ?>
						<?php if( get_option('pinterest')) { ?>
							<a class="pinterest" href="<?php echo get_option('pinterest'); ?>" target="_blank">
								<i class="fa fa-pinterest"></i>
							</a>
						<?php } ?>
						<?php if( get_option('youtube')) { ?>
							<a class="youtube" href="<?php echo get_option('youtube'); ?>" target="_blank">
								<i class="fa fa-youtube"></i>
							</a>
						<?php } ?>
					</div>
				<?php }
			echo '</div></div>';
			echo '<div id="instafeed"></div>';
		echo '</section>';

		echo '<section id="fbsection6">';
			echo '<div class="container">';
				echo '<div class="outer"><div class="inner">';
					echo '<div class="row">';
						echo '<div class="col-sm-8 col-sm-offset-2">';
							get_contactForm();
						echo '</div>';
					echo '</div>';
				echo '</div></div>';
			echo '</div>';
		echo '</section>';

	echo '</div>'; ?>

	<script>
		$(function() {
			cbpFixedScrollLayout.init();
		});
	</script>

<?php get_footer(); 

?>